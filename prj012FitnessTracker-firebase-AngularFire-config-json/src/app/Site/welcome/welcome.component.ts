import { Component, OnInit } from '@angular/core';

import { FireBaseConfigModel } from '../../Models/firebase-config.model';

import { ReadConfigService } from '../../Services/read-config.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  firebaseConfig: FireBaseConfigModel = <FireBaseConfigModel>{}

  constructor(private readConfigService: ReadConfigService) { }

  ngOnInit(): void {

    //get the config info 
    this.firebaseConfig = this.readConfigService.getFirebaseConfig;
  }

}
