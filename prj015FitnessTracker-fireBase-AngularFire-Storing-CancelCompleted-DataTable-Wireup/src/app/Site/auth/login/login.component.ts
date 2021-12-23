import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthDataModel } from '../../../Models/auth-data.model';

import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  //to get the control names so to use the with validation
  get loginFormControl() {
    return this.loginForm.controls;
  }

  onFormSubmit(){
    console.log(this.loginForm); 
    var authData = new AuthDataModel(this.loginForm.value.email, this.loginForm.value.password);
    console.log("authData", authData);
    this.authService.login(authData);
    console.log("LoggedInUser", this.authService.getUser);

  }
}