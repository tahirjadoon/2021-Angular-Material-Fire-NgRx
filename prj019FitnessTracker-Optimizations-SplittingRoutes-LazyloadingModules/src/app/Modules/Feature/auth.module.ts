//feature module
import { NgModule } from '@angular/core';

import { SiteSharedModule } from '../Shared/site-shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from '../../Site/auth/signup/signup.component';
import { LoginComponent } from '../../Site/auth/login/login.component';

@NgModule({
  declarations: [SignupComponent,LoginComponent],
  imports: [SiteSharedModule, AuthRoutingModule],
  exports: [SiteSharedModule]
})
export class AuthModule { }
