import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { AuthDataModel } from '../Models/auth-data.model';
import { UserModel } from '../Models/user.model';

import { TrainingService } from './training.service';
import { UiService } from './Shared/ui.service';

//so that we can inject in other classes
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  hasUserLoggedInSubject : Subject<boolean> = new Subject<boolean>();
  userChangedSubject: Subject<UserModel> = new Subject<UserModel>();

  authStateSubscription: Subscription;
  
  private user: UserModel;
  private isUserAuthenticated: boolean = false;

  constructor(private router: Router, private fireAuth: AngularFireAuth, private trainingService: TrainingService, private uiService: UiService) { }

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
    this.uiService.loadingStateHandle(true);
    //returns a promise
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
                .then(result => {
                  this.uiService.loadingStateHandle(false);
                  //redirect to login
                  this.router.navigate(['/login']);
                })
                .catch(error => {
                    this.uiService.loadingStateHandle(false);
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
    this.uiService.loadingStateHandle(true);
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
                  .then(result => {
                    this.uiService.loadingStateHandle(false);
                  })
                  .catch(error => {
                    this.uiService.loadingStateHandle(false);
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
    this.isUserAuthenticated = false;
    //let the app know that auth is successful
    this.hasUserLoggedInSubject.next(false);
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

  get isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  private authSuccessful(user:any){
    this.isUserAuthenticated = true;
    //let the app know that auth is successful
    this.hasUserLoggedInSubject.next(true);
    //and also set the user 
    this.user = new UserModel(user.email, user.uid);
    this.userChangedSubject.next(this.user);
    //redirect to training
    this.router.navigate(['/training']);
    
  }

}
