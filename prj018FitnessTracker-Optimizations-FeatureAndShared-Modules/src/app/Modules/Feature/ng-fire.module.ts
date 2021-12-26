//feature module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [],
  imports: [CommonModule,  AngularFirestoreModule, AngularFireAuthModule],
  exports: [AngularFirestoreModule, AngularFireAuthModule]
})
export class NgFireModule { }