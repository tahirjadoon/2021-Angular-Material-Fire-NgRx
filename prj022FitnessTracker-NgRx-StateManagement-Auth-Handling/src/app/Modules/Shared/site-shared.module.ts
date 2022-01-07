import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../Feature/material.module';
import { NgFireModule } from '../Feature/ng-fire.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MaterialModule, NgFireModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MaterialModule, NgFireModule]
})
export class SiteSharedModule { }
