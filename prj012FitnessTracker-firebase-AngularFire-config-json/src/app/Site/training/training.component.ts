import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExerciseModel } from '../../Models/exercise.model';

import { TrainingService } from '../../Services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  //subscribe to the start training event
  startExerciseSubscription : Subscription;
  
  //make true when ever we have a running training
  ongoingTraining = false;
  startedExercise: ExerciseModel = <ExerciseModel>{};

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {

    //this receives the started exercise
    this.startExerciseSubscription = this.trainingService.startExerciseSubject.subscribe(ex => {
      this.startedExercise = ex;
      if(ex){
        this.ongoingTraining = true;
      }
      else{
        this.ongoingTraining = false;
      }
    });

  }

  ngOnDestroy(): void {
      if(this.startExerciseSubscription) this.startExerciseSubscription.unsubscribe();
  }
}
