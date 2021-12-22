import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './Guards/auth.guard';

import { LoginComponent } from './Site/auth/login/login.component';
import { SignupComponent } from './Site/auth/signup/signup.component';
import { TrainingComponent } from './Site/training/training.component';
import { WelcomeComponent } from './Site/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
