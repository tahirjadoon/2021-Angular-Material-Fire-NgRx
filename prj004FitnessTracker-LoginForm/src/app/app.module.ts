import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//feature modules
import { MaterialModule } from './Modules/material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { SignupComponent } from './Site/auth/signup/signup.component';
import { LoginComponent } from './Site/auth/login/login.component';
import { TrainingComponent } from './Site/training/training.component';
import { CurrentTrainingComponent } from './Site/training/current-training/current-training.component';
import { NewTrainingComponent } from './Site/training/new-training/new-training.component';
import { PastTrainingsComponent } from './Site/training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './Site/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
