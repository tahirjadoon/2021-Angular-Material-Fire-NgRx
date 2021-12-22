import { Injectable } from '@angular/core';

import fireBaseConfigFile from '../Config/firebase-config.json';
import { FireBaseConfigModel } from '../Models/firebase-config.model';

@Injectable({
  providedIn: 'root'
})
export class ReadConfigService {

  private fireBaseConfig: FireBaseConfigModel = fireBaseConfigFile;

  constructor() { }

  get getFirebaseConfig(): FireBaseConfigModel{
    return {...this.fireBaseConfig}
  }

}
