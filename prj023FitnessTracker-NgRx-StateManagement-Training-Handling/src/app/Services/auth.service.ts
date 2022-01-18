import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { AuthDataModel } from '../Models/auth-data.model';
import { UserModel } from '../Models/user.model';

import { TrainingService } from './training.service';
import { UiService } from './Shared/ui.service';

//app reducer 
import * as fromAppReducer from '../ngRx-Store/app.reducer';
import * as fromUiActions from '../ngRx-Store/ui.actions';
import * as fromAuthAction from '../ngRx-Store/auth.actions';
import { Store } from '@ngrx/store';

//so that we can inject in other classes
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //we are using ngrx to dispatch the status so dont need it any more
  //hasUserLoggedInSubject : Subject<boolean> = new Subject<boolean>();
  userChangedSubject: Subject<UserModel> = new Subject<UserModel>();

  authStateSubscription: Subscription;
  
  private user: UserModel;

  //we are using ngrx to dispatch the status so dont need it any more
  //private isUserAuthenticated: boolean = false;

  constructor(private router: Router, private fireAuth: AngularFireAuth, private trainingService: TrainingService, private uiService: UiService, 
    private ngStore: Store<fromAppReducer.AppState>) { }

  initAuthListener(){
    //status will change when ever we login or logout
    this.fireAuth.authState.subscribe({
      next: (user) => {
        if(user){
          this.authSuccessful(user);
        }
        else{
          this.logoutFull();
        }
      },
      error: (e) => {}, 
      complete: () => {}
    });
  }

  //for now faking the data
  private getFakeUserId() : string{
    return Math.round(Math.random() * 10000).toString();
  }

  //register user
  /*
  registerUser(authData: AuthDataModel){
    this.user = new UserModel(authData.email, this.getFakeUserId());
    this.authSuccessful();
  }
  */
  registerUser(authData: AuthDataModel){
    //not using the service, we have setup ngrx so need to dispatch
    //this.uiService.loadingStateHandle(true);
    this.ngStore.dispatch(new fromUiActions.UiStartLoadingAction());
    //returns a promise
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
                .then(result => {
                  //not using the service, we have setup ngrx so need to dispatch
                  //this.uiService.loadingStateHandle(false);
                  this.ngStore.dispatch(new fromUiActions.UiStopLoadingAction());
                  //redirect to login
                  this.router.navigate(['/login']);
                })
                .catch(error => {
                  //not using the service, we have setup ngrx so need to dispatch
                  //this.uiService.loadingStateHandle(false);
                  this.ngStore.dispatch(new fromUiActions.UiStopLoadingAction());
                  this.uiService.showSnackBar(error.mesage, null, 5);
                });
    
  }

  //login user
  /*
  login(authData: AuthDataModel){
    this.user = new UserModel(authData.email, this.getFakeUserId());    
    this.authSuccessful();
  }
  */
  login(authData: AuthDataModel){
    //not using the service, we have setup ngrx so need to dispatch
    //this.uiService.loadingStateHandle(true);
    this.ngStore.dispatch(new fromUiActions.UiStartLoadingAction());
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
                  .then(result => {
                    //not using the service, we have setup ngrx so need to dispatch
                    //this.uiService.loadingStateHandle(false);
                    this.ngStore.dispatch(new fromUiActions.UiStopLoadingAction());
                  })
                  .catch(error => {
                    //not using the service, we have setup ngrx so need to dispatch
                    //this.uiService.loadingStateHandle(false);
                    this.ngStore.dispatch(new fromUiActions.UiStopLoadingAction());
                    //closing the snack bar after 5 secnds. not using a button so passing null for the second argument
                    var msg = error.message;
                    if(error.message.includes("auth/wrong-password"))
                      msg = "Either email or password is wrong.";
                    else if(error.message.includes("auth/user-not-found"))
                      msg = "Login not found with the specified email.";
                    this.uiService.showSnackBar(msg, null, 5);
                  });
  }

  //logout
  /*
  logout(){
    this.user = null;
    //let the app know that auth is successful
    this.hasUserLoggedInSubject.next(false);
    //redirect to training
    this.router.navigate(['/login']);
  }
  */

  logout(){
    this.fireAuth.signOut();
  }
  private logoutFull(){
    this.user = null;
    this.trainingService.cancelDBSubscriptions();
    if(this.authStateSubscription) this.authStateSubscription.unsubscribe();

    //we are using ngrx so use dispatch
    //this.isUserAuthenticated = false;
    //let the app know that auth is successful
    //this.hasUserLoggedInSubject.next(false);
    this.ngStore.dispatch(new fromAuthAction.SetUnAuthenticated());

    //redirect to training
    this.router.navigate(['/login']);
  }

  get getUser() : UserModel{
    //using the spread operator which is ... to return the new object 
    return {...this.user};
  }

  /*
  get isAuthenticated(): boolean {
    return !!this.user;
  }
  */

  //we are using ngrs so dont need it
  /*
  get isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }
  */

  private authSuccessful(user:any){
    //we are using ngrx so use dispatch
    //this.isUserAuthenticated = true;
    //let the app know that auth is successful
    //this.hasUserLoggedInSubject.next(true);
    this.ngStore.dispatch(new fromAuthAction.SetAuthenticated());

    //and also set the user 
    this.user = new UserModel(user.email, user.uid);
    this.userChangedSubject.next(this.user);
    //redirect to training
    this.router.navigate(['/training']);
    
  }

}
