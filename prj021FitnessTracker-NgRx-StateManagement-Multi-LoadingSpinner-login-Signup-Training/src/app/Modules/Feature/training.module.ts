//feature module
import { NgModule } from '@angular/core';

import { SiteSharedModule } from '../Shared/site-shared.module';
import { TrainingRoutingModule } from './training-routing.module';

import { TrainingComponent } from '../../Site/training/training.component';
import { CurrentTrainingComponent } from '../../Site/training/current-training/current-training.component';
import { NewTrainingComponent } from '../../Site/training/new-training/new-training.component';
import { PastTrainingsComponent } from '../../Site/training/past-trainings/past-trainings.component';
import { StoptrainingDialogueComponent } from '../../Site/training/current-training/stoptraining-dialogue/stoptraining-dialogue.component';

@NgModule({
  declarations: [TrainingComponent, CurrentTrainingComponent, NewTrainingComponent, PastTrainingsComponent, StoptrainingDialogueComponent],
  imports: [SiteSharedModule, TrainingRoutingModule],
  exports: [SiteSharedModule],
  entryComponents: [StoptrainingDialogueComponent]
})
export class TrainingModule { }