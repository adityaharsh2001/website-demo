import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../../shared/mime-type.validator";
import { Subscription } from 'rxjs';

import { Team } from "./team.model";
import { TeamsService } from "./team.service";

@Component({
  moduleId: module.id,
  selector: 'teams-cmp',
  templateUrl: 'teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  closeResult = '';
  status = "upcoming";
  form: FormGroup;
  imagePreview: string;
  isLoading = false;


  constructor(private modalService: NgbModal, public teamsService: TeamsService) {}


  private teamsSub: Subscription;
  teams: Team[] = [];
  private mode = "create";
  private teamId: string;
  team: Team;

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
        name: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        designation: new FormControl(null, {validators: [Validators.required]}),
        linkedin: new FormControl(null, {validators: [Validators.required]}),
        mailId: new FormControl(null, {validators: [Validators.required]}),
        contact: new FormControl(null, {validators: [Validators.required]}),
        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        })
      }
    )

    this.teamsService.getTeams();
    this.teamsSub = this.teamsService.getTeamUpdateListener()
      .subscribe((teams: Team[]) => {
        this.isLoading = false;
        this.teams = teams;
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

  onSaveTeam(event: Event){
    // console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    // event.preventDefault();
    if(this.mode === "create"){
      this.teamId = null

    }
    else{
      this.teamId = this.team._id;

    }
    let workshop = {
      "_id": this.teamId,
      "name": this.form.value.name,
      "designation": this.form.value.designation,
      "mailId": this.form.value.mailId,
      "linkedin": this.form.value.linkedin,
      "contact": this.form.value.contact,
      "image": this.form.value.image
    }
    // "imagePath": this.form.value.name

    if(this.mode === 'create' ){
      // console.log(this.form.value.date);

      this.teamsService.addTeam(workshop,this.form.value.image);
      this.isLoading = false;
    }

    else{
      this.teamsService.updateTeam(workshop, this.form.value.image);
      this.isLoading  = false;
      this.form.reset();
    }
    this.form.reset();
  }

  onDeleteTeam(id){
    this.teamsService.deleteTeam(id);
  }

  onEditTeam(id){

    this.teamId = id;
    // this.lecturesService.findLecture(id);
    this.mode = "edit";
    this.isLoading = true;
        this.teamsService.findTeam(this.teamId).subscribe(teamData => {
          this.isLoading = false;
          this.team = {
            _id: teamData._id,
            name: teamData.name,
            designation: teamData.designation,
            imagePath: teamData.imagePath,
            linkedin: teamData.linkedin,
            mailId: teamData.mailId,
            contact: teamData.contact
          };
          // console.log(this.lecture);
          this.imagePreview = this.team.imagePath;
          this.form.setValue(
          {
            name:this.team.name,
            designation: this.team.designation,
            linkedin: this.team.linkedin,
            mailId:this.team.mailId,
            contact: this.team.contact,
            image: this.team.imagePath,
          }

          );
        });

  }
  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }

}
