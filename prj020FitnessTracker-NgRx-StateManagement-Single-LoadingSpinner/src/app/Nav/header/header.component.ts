import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/Models/user.model';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() hdrSideNavToggle = new EventEmitter<void>();

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

  onToggleSideNav(){
    this.hdrSideNavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
