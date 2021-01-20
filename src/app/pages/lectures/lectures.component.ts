import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";


import { Lecture } from "./lecture.model";
import { LecturesService } from "./lecture.service";

@Component({
  moduleId: module.id,
  selector: 'lectures-cmp',
  templateUrl: 'lectures.component.html',
  styleUrls: ['lectures.component.css']

})

export class LecturesComponent implements OnInit {
  closeResult = '';
  status = "upcoming";
  form: FormGroup;
  constructor(private modalService: NgbModal, public lecturesService: LecturesService,) {}


  Upcoming(){
   this.status = "upcoming"

    // console.log("upcoming");
  }
  Done(){
    this.status = "done";
    // console.log("done");
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
    // console.log("open");
  }


  ngOnInit(): void
  {
    // console.log("init");
    this.status = "upcoming"
    this.form = new FormGroup(
      {
        name: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        profession: new FormControl(null, {validators: [Validators.required]}),
        lectureTitle: new FormControl(null, {validators: [Validators.required]}),
        date: new FormControl(null, {validators: [Validators.required]}),
        regLink: new FormControl(null, {validators: [Validators.required]}),
      }
    )

  }
  onSaveLecture(event: Event){
    // console.log(this.form.value);

    event.preventDefault();
    // console.log(this.form.value.name);

    let lecture = {
      "_id": null,
      "name": this.form.value.name,
      "profession": this.form.value.profession,
      "date": this.form.value.date,
      "regLink": this.form.value.regLink,
      "status": true,
      "lectureTitle": this.form.value.lectureTitle
    }
    // console.log(this.form.value.regLink)
    // console.log(this.form.value.lectureTitle)
    console.log(this.form);
    this.lecturesService.addPost(lecture);

  }
}

