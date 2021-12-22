import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { ExerciseModel } from '../../../Models/exercise.model';

import { TrainingService } from '../../../Services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  //exercises: ExerciseModel[] = [];
  exercises: Observable<any>;

  constructor(private trainingService: TrainingService, private dbFireStore: AngularFirestore) { }

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
    console.log(environment.fireBaseCollectionNames.availableExercises);
    this.exercises = this.dbFireStore.collection(environment.fireBaseCollectionNames.availableExercises).valueChanges();

  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
