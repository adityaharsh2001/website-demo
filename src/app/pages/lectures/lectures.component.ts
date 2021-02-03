import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "./mime-type.validator";
import { Subscription } from 'rxjs';

import { Lecture } from "./lecture.model";
import { LecturesService } from "./lecture.service";
import { DatePipe, getLocaleDateFormat } from '@angular/common';


@Component({
  moduleId: module.id,
  selector: 'lectures-cmp',
  templateUrl: 'lectures.component.html',
  styleUrls: ['lectures.component.css']

})

export class LecturesComponent implements OnInit {
  // const date: NgbDate = new NgbDate(1789, 7, 14);
  closeResult = '';
  status = "upcoming";
  form: FormGroup;
  imagePreview: string;
  isLoading = false;
  constructor(private modalService: NgbModal, public lecturesService: LecturesService,) {}
  private lecturesSub: Subscription;
  lectures: Lecture[] = [];
  private mode = "create";
  private lectureId: string;
  lecture: Lecture;

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
        }),
        time: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        })
      }
    )

    this.lecturesService.getLectures()
    // .subscribe(transformedPosts => {
    //     this.lectures = transformedPosts;
    //     // console.log(this.lectures);
    //     // this.lecturesUpdated.next([...this.lectures]);
    //   });;
    this.lecturesSub = this.lecturesService.getLectureUpdateListener()
      .subscribe((lectures: Lecture[]) => {
        this.isLoading = false;
        this.lectures = lectures;
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

  onSaveLecture(event: Event){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    event.preventDefault();
    if(this.mode === "create"){
      this.lectureId = null

    }
    else{
      this.lectureId = this.lecture._id;

    }
    let lecture = {
      "_id": this.lectureId,
      "name": this.form.value.name,
      "profession": this.form.value.profession,
      "date": this.form.value.date,
      "regLink": this.form.value.regLink,
      "status": this.status,
      "lectureTitle": this.form.value.lectureTitle,
      "image": this.form.value.image,
      "time": this.form.value.time
    }
    // "imagePath": this.form.value.name

    if(this.mode === 'create' ){
      // console.log(this.form.value.date);

      this.lecturesService.addLecture(lecture,this.form.value.image);
      
      this.isLoading = false;
    }

    else{
      this.lecturesService.updateLecture(lecture, this.form.value.image);
      this.isLoading  = false;
    }
    this.form.reset();
  }

  onDeleteLecture(id){
    this.lecturesService.deleteLecture(id);
  }

  onEditLecture(id){

    this.lectureId = id;
    // this.lecturesService.findLecture(id);
    this.mode = "edit";
    this.isLoading = true;
        this.lecturesService.findLecture(this.lectureId).subscribe(lectureData => {
          this.isLoading = false;
          this.lecture = {
            _id: lectureData._id,
            name: lectureData.name,
            profession: lectureData.profession,
            imagePath: lectureData.imagePath,
            date:{
              year : lectureData.date.year,
              day :lectureData.date.day,
              month: lectureData.date.month
            },
            status: lectureData.status,
            lectureTitle: lectureData.lectureTitle,
            regLink: lectureData.regLink,
            time: lectureData.time
          };
          // console.log(this.lecture);
          this.imagePreview = this.lecture.imagePath;
          this.form.setValue(
          {
            name:this.lecture.name,
            profession: this.lecture.profession,
            lectureTitle: this.lecture.lectureTitle,
            date:this.lecture.date,
            regLink: this.lecture.regLink,
            image: this.lecture.imagePath,
            time: this.lecture.time
          }

          );
        });

  }
  ngOnDestroy() {
    // this.lecturesSub.unsubscribe();
  }
}
