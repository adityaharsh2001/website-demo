import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "./mime-type.validator";


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
  imagePreview: string;
  isLoading = false;
  constructor(private modalService: NgbModal, public lecturesService: LecturesService,) {}

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
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
      }
    )

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

  onSaveLecture(event: Event){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    event.preventDefault();
    let lecture = {
      "_id": null,
      "name": this.form.value.name,
      "profession": this.form.value.profession,
      "date": this.form.value.date,
      "regLink": this.form.value.regLink,
      "status": this.status,
      "lectureTitle": this.form.value.lectureTitle,
      "imagePath": this.form.value.image
    }

    this.lecturesService.addPost(lecture);
    this.form.reset();

  }
}

