import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take } from 'rxjs';

import { AuthService } from '../Services/auth.service';

//ngrx store 
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../ngRx-Store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  //using ngrx
  //constructor(private authService: AuthService, private router: Router){}
  constructor(private ngrxStore: Store<fromAppReducer.AppState>, private router: Router){}
  
  //we are using ngrx for the state 
  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {      
      if(this.authService.isAuthenticated){
        return true;
      }
      else{
        //passing the query string to bring the user back to after signin
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });

        return false;
      }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isAuthenticated){
      return true;
    }
    else{
      //passing the query string to bring the user back to after signin
      this.router.navigate(['/login'], {
        queryParams: {
          returnCanLoad: route.path
        }
      });
      return false; 
    }
  }
  */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {      
      return this.ngrxStore.select(fromAppReducer.getIsAuthenticatedFlag).pipe(
        take(1)
      );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.ngrxStore.select(fromAppReducer.getIsAuthenticatedFlag).pipe(
      take(1)
    );
  }
  
}
