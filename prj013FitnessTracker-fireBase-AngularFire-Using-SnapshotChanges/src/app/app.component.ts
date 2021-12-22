import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

import { FireBaseConfigModel } from './Models/firebase-config.model';

import { ReadConfigService } from './Services/read-config.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prj001FitnessTracker-BasicSetup';
  firebaseConfig: FireBaseConfigModel = <FireBaseConfigModel>{}

  warningText = "";

  constructor(private readConfigService: ReadConfigService){}

  ngOnInit(): void {

    this.firebaseConfig = this.readConfigService.getFirebaseConfig;

    //not displaying the warning any more from the readConfigService
    //this.buildAndDisplayWarning();

    //instead displaying the warning from the environment config
    this.buildAndDisplayWarningEnvironment();
  }

  private buildAndDisplayWarning(){
    let warning = "";

    if(!this.firebaseConfig){
      warning = "No config available";
    }
    else if(!this.firebaseConfig.firebase){
      warning = "No firebase config available";
    }
    else{
      warning = this.buildWarningMessage(this.firebaseConfig.firebase.backEndApiKey, "backEndApiKey", warning);
      warning = this.buildWarningMessage(this.firebaseConfig.firebase.backEndAuthDomain, "backEndAuthDomain", warning);
      warning = this.buildWarningMessage(this.firebaseConfig.firebase.backEndUrl, "backEndUrl", warning);
      if(warning){
        warning = `Firebase Config missing: ${warning}`
      }

    }
    if(warning){
      this.warningText = `readConfigService - ${warning}`;
    }
  }

  private buildAndDisplayWarningEnvironment(){
    let warning = "";
    if(!environment.firebase){
      warning = "No firebase config available";
    }
    else {
      warning = this.buildWarningMessage(environment.firebase.apiKey, "apiKey", warning);
      warning = this.buildWarningMessage(environment.firebase.authDomain, "authDomain", warning);
      warning = this.buildWarningMessage(environment.firebase.projectId, "projectId", warning);
      warning = this.buildWarningMessage(environment.firebase.storageBucket, "storageBucket", warning);
      warning = this.buildWarningMessage(environment.firebase.messagingSenderId, "messagingSenderId", warning);
      warning = this.buildWarningMessage(environment.firebase.appId, "appId", warning);
      warning = this.buildWarningMessage(environment.firebase.measurementId, "measurementId", warning);
      if(warning){
        warning = `Firebase Config missing: ${warning}`
      }
    }
    if(warning){
      this.warningText = `Environment.ts Must Provide<br> ${warning}`;
    }
  }

  private buildWarningMessage(key: string, keyWarning: string, warning: string):string{
    if(key && !key.includes("<your")){
      return warning; //as is
    }
    if(warning) warning += ", "
    warning += keyWarning;
    return warning;
  }

}
