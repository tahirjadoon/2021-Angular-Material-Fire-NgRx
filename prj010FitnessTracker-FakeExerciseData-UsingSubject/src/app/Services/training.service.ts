import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ExerciseModel } from '../Models/exercise.model';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  private availableExercises: ExerciseModel[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private runningExercise : ExerciseModel;
  private exercises: ExerciseModel[] = [];


  startExerciseSubject: Subject<ExerciseModel> = new Subject<ExerciseModel>();

  constructor() { }

  getAvailableExercises(): ExerciseModel[]{
    //have to use slice can't use ...
    //return {...this.availableExercises};
    return this.availableExercises.slice();
  }

  //receives the id of the exercise
  startExercise(exerciseId: string){
    const selectedExercise = this.availableExercises.find(ex => ex.id === exerciseId);
    this.runningExercise = selectedExercise;
    this.startExerciseSubject.next({...selectedExercise});
  }

  //exercise completed
  completeExercise(){
    //push the running exercise to exercises with date 
    this.exercises.push({...this.runningExercise, date:  new Date(), state: 'completed' });
    this.runningExercise = null;
    this.startExerciseSubject.next(null);
  }

  //exercise stopped/cancelled
  cancelExercise(progress:number){
    //push the running exercise to exercises with date 
    const actualDuration = this.runningExercise.duration * (progress / 100);
    const actualCalories = this.runningExercise.duration * (progress / 100);
    this.exercises.push({...this.runningExercise, duration: actualDuration, calories: actualCalories, date:  new Date(), state: 'cancelled' });
    this.runningExercise = null;
    this.startExerciseSubject.next(null);
  }

  //get running exercise
  get getRunningExercise() : ExerciseModel{
    return {...this.runningExercise};
  }

}
