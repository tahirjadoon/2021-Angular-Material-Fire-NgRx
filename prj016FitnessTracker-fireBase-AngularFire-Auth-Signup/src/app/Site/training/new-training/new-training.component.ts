import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ExerciseModel } from '../../../Models/exercise.model';

import { TrainingService } from '../../../Services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: ExerciseModel[] = [];
  //exercises: Observable<any>;
  //exercises: Observable<ExerciseModel[]>;

  //subscribe to exercisesFetchedSubject event being thrown by TrainingService
  exercisesFetchedSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    //initial static data load
    //this.exercises = this.trainingService.getAvailableExercises();

    //get data from "availableExercises"
    /*
    this.dbFireStore.collection('availableExercises').valueChanges().subscribe(result => {
      console.log(result);
    });
    */
    //get the collection name from the environment file
    //console.log(environment.fireBaseCollectionNames.availableExercises);
    /*
    this.dbFireStore
        .collection(environment.fireBaseCollectionNames.availableExercises)
        .snapshotChanges()
        .subscribe(result => {
          for(const r of result){
            console.log(r.payload.doc.id, r.payload.doc.data());
          }
        });
    */
    /*
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
        .subscribe(result => {
          console.log(result);
        });
    */

    //assign to exercises 
    /*
    this.exercises = this.dbFireStore
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
    );
    */

    //subscribe to exercisesFetchedSubject
    this.exercisesFetchedSubscription = this.trainingService.exercisesFetchedSubject.subscribe({
      next: (exercises: ExerciseModel[]) => {
        console.log("New trainings fetched", exercises);
        this.exercises = exercises;
      },
      error: (e) => {},
      complete: () => {}
    });
    //get the data 
    this.trainingService.getAvailableExercises();
    
  }

  ngOnDestroy(): void {
      if(this.exercisesFetchedSubscription) this.exercisesFetchedSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm){
    console.log(form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }

}
