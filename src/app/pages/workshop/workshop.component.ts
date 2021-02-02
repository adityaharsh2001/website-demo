import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../../shared/mime-type.validator";
import { Subscription } from 'rxjs';

import { Workshop } from "./workshop.model";
import { WorkshopsService } from "./workshop.service";


@Component({
  moduleId: module.id,
  selector: 'workshop-cmp',
  templateUrl: 'workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {

  closeResult = '';
  status = "upcoming";
  form: FormGroup;
  imagePreview: string;
  isLoading = false;

  constructor(private modalService: NgbModal, public workshopsService: WorkshopsService) {}

  private workshopsSub: Subscription;
  workshops: Workshop[] = [];
  private mode = "create";
  private workshopId: string;
  workshop: Workshop;

  Upcoming(){
   this.status = "upcoming"
  }
  Done(){
    this.status = "done";
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {
    this.status = "upcoming"
    this.form = new FormGroup(
      {
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        description: new FormControl(null, {validators: [Validators.required]}),
        price: new FormControl(null, {validators: [Validators.required]}),
        date: new FormControl(null, {validators: [Validators.required]}),
        regLink: new FormControl(null, {validators: [Validators.required]}),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        }),
        time: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        })
      }
    )

    this.workshopsService.getWorkshops();
    this.workshopsSub = this.workshopsService.getWorkshopUpdateListener()
      .subscribe((workshops: Workshop[]) => {
        this.isLoading = false;
        this.workshops = workshops;
      });
      // console.log(lectures);
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveWorkshop(event: Event){
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    // event.preventDefault();
    if(this.mode === "create"){
      this.workshopId = null

    }
    else{
      this.workshopId = this.workshop._id;

    }
    let workshop = {
      "_id": this.workshopId,
      "title": this.form.value.title,
      "description": this.form.value.description,
      "date": this.form.value.date,
      "regLink": this.form.value.regLink,
      "status": this.status,
      "price": this.form.value.price,
      "image": this.form.value.image,
      "time":this.form.value.time
    }
    // "imagePath": this.form.value.name

    if(this.mode === 'create' ){
      // console.log(this.form.value.date);

      this.workshopsService.addWorkshop(workshop,this.form.value.image);
      this.isLoading = false;
    }

    else{
      this.workshopsService.updateWorkshop(workshop, this.form.value.image);
      this.isLoading  = false;
      this.form.reset();
    }
    this.form.reset();
  }

  onDeleteWorkshop(id){
    this.workshopsService.deleteWorkshop(id);
  }

  onEditWorkshop(id){

    this.workshopId = id;
    // this.lecturesService.findLecture(id);
    this.mode = "edit";
    this.isLoading = true;
        this.workshopsService.findWorkshop(this.workshopId).subscribe(workshopData => {
          this.isLoading = false;
          this.workshop = {
            _id: workshopData._id,
            title: workshopData.title,
            description: workshopData.description,
            imagePath: workshopData.imagePath,
            date:{
              year : workshopData.date.year,
              day :workshopData.date.day,
              month: workshopData.date.month
            },
            status: workshopData.status,
            price: workshopData.price,
            regLink: workshopData.regLink,
            time: workshopData.time
          };
          // console.log(this.lecture);
          this.imagePreview = this.workshop.imagePath;
          this.form.setValue(
          {
            title:this.workshop.title,
            description: this.workshop.description,
            price: this.workshop.price,
            date:this.workshop.date,
            regLink: this.workshop.regLink,
            image: this.workshop.imagePath,
            time: this.workshop.time
          }

          );
        });

  }
  ngOnDestroy() {
    this.workshopsSub.unsubscribe();
  }


}
