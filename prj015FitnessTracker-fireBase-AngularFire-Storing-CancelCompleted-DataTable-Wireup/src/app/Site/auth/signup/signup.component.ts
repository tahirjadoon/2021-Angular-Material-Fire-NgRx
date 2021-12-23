import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthDataModel } from '../../../Models/auth-data.model';

import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //set to min 18 years
    this.maxDate  = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onFormSubmit(form: NgForm){
    console.log(form);
    var authData = new AuthDataModel(form.value.email, form.value.password);
    console.log("authData: ", authData);
    this.authService.registerUser(authData);
    console.log("registered user: ", this.authService.getUser);
  }
}