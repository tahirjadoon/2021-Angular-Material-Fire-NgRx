import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthDataModel } from '../../../Models/auth-data.model';

import { AuthService } from '../../../Services/auth.service';
import { UiService } from '../../../Services/Shared/ui.service';

//app reducer 
import * as fromAppReducer from '../../../ngRx-Store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  isLoading$: Observable<boolean>;
  loadingStateSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private uiService: UiService, private ngStore: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      this.router.navigate(['/training']);
    }

    /*
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => {
      this.isLoading = state;
    });
    */
    //no need to unsubscribe since ngrx is detroyed on it own 
    this.isLoading$ = this.ngStore.select(fromAppReducer.getIsUiLoadingFlag);

    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
    
  }

  ngOnDestroy(): void {
      //if(this.loadingStateSubscription) this.loadingStateSubscription.unsubscribe();
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