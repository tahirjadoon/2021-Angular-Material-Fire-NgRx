import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './Guards/auth.guard';

import { WelcomeComponent } from './Site/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent}, 
  { path: 'training', loadChildren: () => import('./Modules/Feature/training.module')
                                          .then(m => m.TrainingModule), 
                                          canLoad: [AuthGuard],
                                          canActivate: [AuthGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
