import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ExerciseModel } from '../../Models/exercise.model';

import { TrainingService } from '../../Services/training.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromTrainingReducer from '../../ngRx-Store/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  //subscribe to the start training event
  startExerciseSubscription : Subscription;
  
  //we are using ng store so the params will change
  //make true when ever we have a running training
  //ongoingTraining = false;
  ongoingTraining$: Observable<boolean>;
  //startedExercise: ExerciseModel = <ExerciseModel>{};

  constructor(private trainingService: TrainingService, 
    private ngStore: Store<fromTrainingReducer.AppState>) { }

  ngOnInit(): void {

    //we are using ngrx so dispatching the started exercise
    /*
    //this receives the started exercise
    this.startExerciseSubscription = this.trainingService.startExerciseSubject.subscribe({
      next: (ex:ExerciseModel) => {
        this.startedExercise = ex;
        if(ex){
          this.ongoingTraining = true;
        }
        else{
          this.ongoingTraining = false;
        }
      },
      error: (e) => {},
      complete: () => {}
    });
    */
    this.ongoingTraining$ = this.ngStore.select(fromTrainingReducer.getIsOngoingTraining);
  }

  ngOnDestroy(): void {
      if(this.startExerciseSubscription) this.startExerciseSubscription.unsubscribe();
  }
}
