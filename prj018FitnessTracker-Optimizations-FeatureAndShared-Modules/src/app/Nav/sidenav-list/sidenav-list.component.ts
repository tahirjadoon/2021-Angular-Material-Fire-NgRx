import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserModel } from '../../Models/user.model';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideNavListClose = new EventEmitter<void>();
  isUserAuthenticated: boolean = false;
  authSubscription: Subscription;
  userChangedSubscription: Subscription;
  loggedInUser: UserModel = <UserModel>{};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.hasUserLoggedInSubject.subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
    this.userChangedSubscription = this.authService.userChangedSubject.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  ngOnDestroy(): void {
      if(this.authSubscription) this.authSubscription.unsubscribe();
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
