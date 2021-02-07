import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../../shared/mime-type.validator";
import { Subscription } from 'rxjs';

import { Competition } from "./competition.model";
import {CompetitionsService } from "./competition.service";
import { DatePipe, getLocaleDateFormat } from '@angular/common';



@Component({
  moduleId: module.id,
  selector: 'competition-cmp',
  templateUrl: 'competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  closeResult = '';
  status = "upcoming";
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  constructor(private modalService: NgbModal, public competitionsService: CompetitionsService,) {}
  private competitionsSub: Subscription;
  competitions: Competition[] = [];
  private mode = "create";
  private competitionId: string;
  competition: Competition;

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

  ngOnInit(): void
  {

    // console.log(getLocaleDateFormat);
    this.status = "upcoming"
    this.form = new FormGroup(
      {
        title: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        description: new FormControl(null, {validators: [Validators.required]}),

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

    this.competitionsService.getCompetitions();
    this.competitionsSub = this.competitionsService.getCompetitionUpdateListener()
      .subscribe((competitions: Competition[]) => {
        this.isLoading = false;
        this.competitions = competitions;
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

  onSaveCompetition(event: Event){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    event.preventDefault();
    if(this.mode === "create"){
      this.competitionId = null

    }
    else{
      this.competitionId = this.competition._id;

    }
    let lecture = {
      "_id": this.competitionId,
      "title": this.form.value.title,
      "description": this.form.value.description,
      "date": this.form.value.date,
      "regLink": this.form.value.regLink,
      "status": this.status,
      "image": this.form.value.image,
      "time":this.form.value.time
    }



    if(this.mode === 'create' ){

      this.competitionsService.addCompetition(lecture,this.form.value.image);
      this.isLoading = false;
      this.form.reset();
    }

    else{
      this.competitionsService.updateCompetition(lecture, this.form.value.image);
      this.isLoading  = false;
      this.form.reset();
    }
    this.form.reset();
  }

  onDeleteCompetition(id){
    this.competitionsService.deleteCompetition(id);
  }

  onEditCompetition(id){

    this.competitionId = id;
    // this.lecturesService.findLecture(id);
    this.mode = "edit";
    this.isLoading = true;
        this.competitionsService.findCompetition(this.competitionId).subscribe(competitionData => {
          this.isLoading = false;
          this.competition = {
            _id: competitionData._id,
            title: competitionData.title,
            description: competitionData.description,
            imagePath: competitionData.imagePath,
            date:{
              year : competitionData.date.year,
              day :competitionData.date.day,
              month: competitionData.date.month
            },
            status: this.status,

            regLink: competitionData.regLink,
            time:competitionData.time
          };
          // console.log(this.lecture);
          this.imagePreview = this.competition.imagePath;
          this.form.setValue(
          {
            title:this.competition.title,
            description: this.competition.description,
            status: this.competition.status,
            date:this.competition.date,
            regLink: this.competition.regLink,
            image: this.competition.imagePath,
            time: this.competition.time
          }

          );
        });

  }
  ngOnDestroy() {
    this.competitionsSub.unsubscribe();
  }

}
