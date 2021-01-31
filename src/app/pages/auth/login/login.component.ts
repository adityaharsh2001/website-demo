import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCorrect: boolean = false;
  form: FormGroup;
  constructor(public authService: AuthService) { }

  ngOnInit() {

  }
  checkUser(form: NgForm){

    console.log(form.value.username);
    this.authService.checkingUser(form.value.username).subscribe(response =>{
      console.log(response);
    });

  }

}
