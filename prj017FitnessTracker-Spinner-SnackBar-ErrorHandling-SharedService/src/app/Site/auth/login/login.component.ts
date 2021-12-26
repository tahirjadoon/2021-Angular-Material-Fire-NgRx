import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthDataModel } from '../../../Models/auth-data.model';

import { AuthService } from '../../../Services/auth.service';
import { UiService } from '../../../Services/Shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;

  loadingStateSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private uiService: UiService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      this.router.navigate(['/training']);
    }

    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => {
      this.isLoading = state;
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
    
  }

  ngOnDestroy(): void {
      if(this.loadingStateSubscription) this.loadingStateSubscription.unsubscribe();
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