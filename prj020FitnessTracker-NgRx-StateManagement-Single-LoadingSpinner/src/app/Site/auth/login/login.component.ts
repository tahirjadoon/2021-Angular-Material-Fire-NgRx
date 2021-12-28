import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';

//ngrx-store 
import { select, State, Store } from '@ngrx/store';
import * as loadingSpinnerStore from '../../../ngRx-Store/app.loading-state.reducer';
import { NgRxConstants } from "../../../ngRx-Store/ng-rx.constants";

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
  isLoading$: Observable<loadingSpinnerStore.LoadingState>;
  isLoading2$: Observable<boolean>;

  loadingStateSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private uiService: UiService, private ngRxStore: Store<{ui: loadingSpinnerStore.LoadingState}> ) {
    //inject
    //private store2: Store<{ui: loadingSpinnerStore.LoadingState}>
    //one way commented
    //this.isLoading$ = this.store2.pipe(select('ui'));
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      this.router.navigate(['/training']);
    }

    /*
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => {
      this.isLoading = state;
    });
    */
     
    //one way 
    /*
    this.loadingStateSubscription = this.isLoading$.pipe(
      map(x => {
        this.isLoading = x.isLoading;
      })
    ).subscribe();
    */

    //simple way 
    this.isLoading2$ = this.ngRxStore.pipe(
      map(x => x.ui.isLoading)
    );
    
    /*
    this.loadingStateSubscription = this.ngRxStore.pipe(
      map(x => x.ui.isLoading)
    ).subscribe(x => {
      this.isLoading = x;
    });
    */
    
    

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