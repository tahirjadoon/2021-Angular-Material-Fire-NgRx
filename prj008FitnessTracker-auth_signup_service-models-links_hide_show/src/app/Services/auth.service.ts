import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthDataModel } from '../Models/auth-data.model';
import { UserModel } from '../Models/user.model';

//so that we can inject in other classes
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  hasUserLoggedInSubject : Subject<boolean> = new Subject<boolean>();
  
  private user: UserModel;

  constructor() { }

  //for now faking the data
  private getFakeUserId() : string{
    return Math.round(Math.random() * 10000).toString();
  }

  //register user
  registerUser(authData: AuthDataModel){
    this.user = new UserModel(authData.email, this.getFakeUserId());
    this.hasUserLoggedInSubject.next(true);
  }

  //login user
  login(authData: AuthDataModel){
    this.user = new UserModel(authData.email, this.getFakeUserId());
    this.hasUserLoggedInSubject.next(true);
  }

  //logout
  logout(){
    this.user = null;
  }

  get getUser() : UserModel{
    //using the spread operator which is ... to return the new object 
    return {...this.user};
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

}
