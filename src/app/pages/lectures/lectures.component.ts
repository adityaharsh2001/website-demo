import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from "@angular/forms";



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
  constructor(private modalService: NgbModal) {}


  Upcoming(){
   this.status = "upcoming"

    console.log("upcoming");
  }
  Done(){
    this.status = "done";
    console.log("done");
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
    console.log("open");
  }


  ngOnInit(): void
  {
    console.log("init");
    this.status = "upcoming"
    this.form = new FormGroup(
      {
        name: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        profession: new FormControl(null, {validators: [Validators.required]}),
        lecture_title: new FormControl(null, {validators: [Validators.required]}),
        date: new FormControl(null, {validators: [Validators.required]}),
        registration_link: new FormControl(null, {validators: [Validators.required]}),
      }
    )

  }
  onSaveLecture(){
    console.log(this.form.value);
    // console.log("daf;jdaf");
    console.log(this.form.value.name);
  }
}

