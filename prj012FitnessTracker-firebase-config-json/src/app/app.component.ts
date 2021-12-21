import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

import { FireBaseConfigModel } from './Models/firebase-config.model';

import { ReadConfigService } from './Services/read-config.service';

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

    if(!this.firebaseConfig){
      this.warningText = "No config available";
    }
    else if(!this.firebaseConfig.firebase){
      this.warningText = "No firebase config available";
    }
    else{
      let warning = "";
      if(!this.firebaseConfig.firebase.backEndApiKey){
        warning = "BackEndApiKey";
      }
      if(!this.firebaseConfig.firebase.backEndAuthDomain){
        if(warning) warning += ", "
        warning += "BackEndAuthDomain";
      }
      if(!this.firebaseConfig.firebase.backEndUrl){
        if(warning) warning += ", "
        warning += "BackEndUrl";
      }
      if(warning){
        this.warningText = `Firebase Config missing: ${warning}`;
      }
    }

  }

}
