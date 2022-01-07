import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { UserModel } from '../../Models/user.model';

import { AuthService } from '../../Services/auth.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../app/ngRx-Store/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideNavListClose = new EventEmitter<void>();
  //we are using ngrx so change it to observable
  //isUserAuthenticated: boolean = false;
  isUserAuthenticated$: Observable<boolean>;
  authSubscription: Subscription;
  userChangedSubscription: Subscription;
  loggedInUser: UserModel = <UserModel>{};

  constructor(private authService: AuthService, private ngrsStore: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    //using ngrx now
    /*
    this.authSubscription = this.authService.hasUserLoggedInSubject.subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
    */
   this.isUserAuthenticated$ = this.ngrsStore.select(fromAppReducer.getIsAuthenticatedFlag);

    this.userChangedSubscription = this.authService.userChangedSubject.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  ngOnDestroy(): void {
      //using ngrx now
      //if(this.authSubscription) this.authSubscription.unsubscribe();
      if(this.userChangedSubscription) this.userChangedSubscription.unsubscribe();
  }

  onSideNavClose(){
    this.sideNavListClose.emit();
  }

  onLogout(){
    this.onSideNavClose();
    this.authService.logout();
  }

}
