import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router){}
  
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
  
}
