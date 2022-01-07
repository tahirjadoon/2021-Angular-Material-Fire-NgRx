import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '../../../app/Models/user.model';

//ngrx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../app/ngRx-Store/app.reducer';

import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() hdrSideNavToggle = new EventEmitter<void>();

  //using ngrx so chnage to observable<boolean>
  //isUserAuthenticated: boolean = false;
  isUserAuthenticated$: Observable<boolean>;
  authSubscription: Subscription;
  userChangedSubscription: Subscription;
  loggedInUser: UserModel = <UserModel>{};

  constructor(private authService: AuthService, private ngrxStore: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    //we are using ngrx now
    /*
    this.authSubscription = this.authService.hasUserLoggedInSubject.subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
    */
    this.isUserAuthenticated$ = this.ngrxStore.select(fromAppReducer.getIsAuthenticatedFlag);

    this.userChangedSubscription = this.authService.userChangedSubject.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  ngOnDestroy(): void {
      //using ngrx
      //if(this.authSubscription) this.authSubscription.unsubscribe();
      if(this.userChangedSubscription) this.userChangedSubscription.unsubscribe();
  }

  onToggleSideNav(){
    this.hdrSideNavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
