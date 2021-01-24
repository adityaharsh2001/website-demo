import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../../shared/mime-type.validator";
import { Subscription } from 'rxjs';

import { Sponsor } from "./sponsor.model";
import { SponsorsService } from "./sponsor.service";


@Component({
  moduleId: module.id,
  selector: 'sponsors-cmp',
  templateUrl: 'sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  closeResult = '';
  status = "upcoming";
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  constructor(private modalService: NgbModal
    , public sponsorsService: SponsorsService) {}


    private teamsSub: Subscription;
    sponsors: Sponsor[] = [];
    private mode = "create";
    private sponsorId: string;
    sponsor: Sponsor;

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
        sponsorName: new FormControl(null, {
          validators: [Validators.required]
        }),
        sponsorTitle: new FormControl(null, {validators: [Validators.required]}),
        year: new FormControl(null, {validators: [Validators.required]}),
        link: new FormControl(null, {validators: [Validators.required]}),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
      }
    )

    this.sponsorsService.getSponsors();
    this.teamsSub = this.sponsorsService.getSponsorUpdateListener()
      .subscribe((sponsors: Sponsor[]) => {
        this.isLoading = false;
        this.sponsors = sponsors;
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

  onSaveSponsor(event: Event){
    // console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    // event.preventDefault();
    if(this.mode === "create"){
      this.sponsorId = null

    }
    else{
      this.sponsorId = this.sponsor._id;

    }
    let sponsor = {
      "_id": this.sponsorId,
      "sponsorName": this.form.value.sponsorName,
      "sponsorTitle": this.form.value.sponsorTitle,
      "year": this.form.value.year,
      "link": this.form.value.link,
      "image": this.form.value.image,
      "status": this.status
    }
    // "imagePath": this.form.value.name

    if(this.mode === 'create' ){
      // console.log(this.form.value.date);

      this.sponsorsService.addSponsor(sponsor,this.form.value.image);
      this.isLoading = false;
    }

    else{
      this.sponsorsService.updateSponsor(sponsor, this.form.value.image);
      this.isLoading  = false;
      this.form.reset();
    }
    this.form.reset();
  }

  onDeleteSponsor(id){
    this.sponsorsService.deleteSponsor(id);
  }

  onEditSponsor(id){

    this.sponsorId = id;
    // this.lecturesService.findLecture(id);
    this.mode = "edit";
    this.isLoading = true;
        this.sponsorsService.findSponsor(this.sponsorId).subscribe(sponsorData => {
          this.isLoading = false;
          this.sponsor = {
            _id: sponsorData._id,
            sponsorName: sponsorData.sponsorName,
            sponsorTitle: sponsorData.sponsorTitle,
            imagePath: sponsorData.imagePath,
            year: sponsorData.year,
            link: sponsorData.link,
            status: this.status
          };
          // console.log(this.lecture);
          this.imagePreview = this.sponsor.imagePath;
          this.form.setValue(
          {
            sponsorName:this.sponsor.sponsorName,
            sponsorTitle: this.sponsor.sponsorTitle,
            year: this.sponsor.year,
            link:this.sponsor.link,
            image: this.sponsor.imagePath,
          }

          );
        });

  }
  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }


}
