import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthDataModel } from '../../../Models/auth-data.model';

import { AuthService } from '../../../Services/auth.service';
import { UiService } from '../../../Services/Shared/ui.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../ngRx-Store/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading: boolean = false;
  isLoading$: Observable<boolean>;

  loadngStateSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private uiService: UiService, private ngStore: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated){
      this.router.navigate(['/training']);
    }
    /*
    this.loadngStateSubscription = this.uiService.loadingStateChanged.subscribe(state => {
      this.isLoading = state;
    })
    */
    //no need to unsubscribe since ngrx is detroyed on it own 
    this.isLoading$ = this.ngStore.select(fromAppReducer.getIsUiLoadingFlag);

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