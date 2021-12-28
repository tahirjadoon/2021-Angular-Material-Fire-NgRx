import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, Subscription } from 'rxjs';

import { environment } from '../../environments/environment';

import { ExerciseModel } from '../Models/exercise.model';
import { UiService } from './Shared/ui.service';

//ngrx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../ngRx-Store/app.reducer';
import * as fromUiActions from '../ngRx-Store/ui.actions';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  /*
  not relevant any more since we are pulling the data from the firebase
  private availableExercises: ExerciseModel[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  */
  private availableExercises: ExerciseModel[] = [];

  private runningExercise : ExerciseModel;
  //private exercises: ExerciseModel[] = [];


  startExerciseSubject: Subject<ExerciseModel> = new Subject<ExerciseModel>();
  exercisesFetchedSubject: Subject<ExerciseModel[]> = new Subject<ExerciseModel[]>();
  pastExercisesSubject: Subject<ExerciseModel[]> = new Subject<ExerciseModel[]>();

  private fireBaseSubscriptions: Subscription[] = [];

  constructor(private dbFireStore: AngularFirestore, private uiService: UiService, private ngStore: Store<fromAppReducer.AppState>) { }

  //convert the getAvailableExercises to fetch the data from the firebase
  /*
  getAvailableExercises(): ExerciseModel[]{
    //have to use slice can't use ...
    //return {...this.availableExercises};
    return this.availableExercises.slice();
  }
  */
  getAvailableExercises(){
    //this.uiService.loadingStateHandle(true);
    this.ngStore.dispatch(new fromUiActions.UiStartLoadingAction());
    this.fireBaseSubscriptions.push(
      this.dbFireStore
      .collection(environment.fireBaseCollectionNames.availableExercises)
      .snapshotChanges()
      .pipe(
        map(docArray => { //map rxjs operator
          return docArray.map(doc => { //using javascript map to map array to ExerciseModel
            return {
              id: doc.payload.doc.id, 
              ...doc.payload.doc.data() as ExerciseModel
            };
          });
        })
      )
      .subscribe({
        next: (exercises: ExerciseModel[]) => {
          //this.uiService.loadingStateHandle(false);
          this.ngStore.dispatch(new fromUiActions.UiStopLoadingAction());
          //assign
          this.availableExercises = exercises;
          //fire exercisesFetchedSubject event 
          this.exercisesFetchedSubject.next([...this.availableExercises]);
          
        },
        error: (e) => {
          //this.uiService.loadingStateHandle(false);
          this.ngStore.dispatch(new fromUiActions.UiStopLoadingAction());
          this.uiService.showSnackBar(e.message, null, 5);
        },
        complete: () => {
          
        }
      })
    );
  }

  //receives the id of the exercise
  startExercise(exerciseId: string){
    const selectedExercise = this.availableExercises.find(ex => ex.id === exerciseId);
    console.log("selectedExercis", selectedExercise);
    this.runningExercise = selectedExercise;
    this.startExerciseSubject.next({...selectedExercise});
  }

  //exercise completed
  completeExercise(){
    //push the running exercise to exercises with date 
    //this.exercises.push({...this.runningExercise, date:  new Date(), state: 'completed' });
    this.addDataToDatabase({...this.runningExercise, date:  new Date(), state: 'completed' });
    this.runningExercise = null;
    this.startExerciseSubject.next(null);
  }

  //exercise stopped/cancelled
  cancelExercise(progress:number){
    //push the running exercise to exercises with date 
    const actualDuration = this.runningExercise.duration * (progress / 100);
    const actualCalories = this.runningExercise.calories * (progress / 100);
    //this.exercises.push({...this.runningExercise, duration: actualDuration, calories: actualCalories, date:  new Date(), state: 'cancelled' });
    this.addDataToDatabase({...this.runningExercise, duration: actualDuration, calories: actualCalories, date:  new Date(), state: 'cancelled' });
    this.runningExercise = null;
    this.startExerciseSubject.next(null);
  }

  //get running exercise
  get getRunningExercise() : ExerciseModel{
    return {...this.runningExercise};
  }

  // get getPastExercises() : ExerciseModel[]{
  //   return this.exercises.slice();
  // }
  getPastExercises(){
    this.fireBaseSubscriptions.push(
      this.dbFireStore
        .collection(environment.fireBaseCollectionNames.finishedExercises)
        .valueChanges() //gives us the record without the record id which is goot in this case. Otherwise use the same as getAvailableExercises method
        .subscribe({
          next:  (exercises: ExerciseModel[]) => {
          //fire exercisesFetchedSubject event 
          this.pastExercisesSubject.next([...exercises]);
          },
          error: (e) => {
           this.uiService.showSnackBar(e.message, null, 5);
          },
          complete: () => {
            
          }
        })
    );
  }

  cancelDBSubscriptions(){
    if(this.fireBaseSubscriptions){
      this.fireBaseSubscriptions.forEach(dbSub => dbSub.unsubscribe());
    }
  }

  private addDataToDatabase(exercise: ExerciseModel){
    //gives back a promise which is then or catch
    this.dbFireStore.collection(environment.fireBaseCollectionNames.finishedExercises).add(exercise);
  }

}
