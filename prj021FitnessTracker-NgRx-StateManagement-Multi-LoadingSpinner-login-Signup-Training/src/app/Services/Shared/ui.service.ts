import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private matSnackBar: MatSnackBar) { }

  loadingStateHandle(state:boolean){
    this.loadingStateChanged.next(state);
  }

  ///show snack bar 
  ///<parm name="message">message</parm>
  ///<parm name="action">action buttons</parm>
  ///<parm name="duration">duration in seconds</parm>
  showSnackBar(message:string, action:any, durationInSeconds: number){
    this.matSnackBar.open(message, action, {
      duration: 1000*durationInSeconds
    });
  }
}
