import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ExerciseModel } from '../../../Models/exercise.model';

import { TrainingService } from '../../../Services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: ExerciseModel[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

}
