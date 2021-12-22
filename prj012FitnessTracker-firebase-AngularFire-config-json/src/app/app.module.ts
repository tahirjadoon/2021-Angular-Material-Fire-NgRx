import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

//angular fire 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

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
import { HeaderComponent } from './Nav/header/header.component';
import { SidenavListComponent } from './Nav/sidenav-list/sidenav-list.component';
import { StoptrainingDialogueComponent } from './Site/training/current-training/stoptraining-dialogue/stoptraining-dialogue.component';

import { AuthService } from './Services/auth.service';

//get the environments file 
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StoptrainingDialogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule, 
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [StoptrainingDialogueComponent]
})
export class AppModule { }
