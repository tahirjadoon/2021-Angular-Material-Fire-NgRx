//feature module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainingComponent } from '../../Site/training/training.component';

/*
const routes: Routes = [
    {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
];
*/

/*
const routes: Routes = [
    {path: '', component: TrainingComponent, canActivate: [AuthGuard]}
];
*/

//move the auth guard to app-routing.module.ts. should not download this section due to lazy loading if the user is not logged in. 
const routes: Routes = [
    {path: '', component: TrainingComponent}
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class TrainingRoutingModule { }