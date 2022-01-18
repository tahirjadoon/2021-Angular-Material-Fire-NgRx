import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseModel } from '../../../Models/exercise.model';

import { TrainingService } from '../../../Services/training.service';

//stop training dialog components
import { StoptrainingDialogueComponent } from './stoptraining-dialogue/stoptraining-dialogue.component';

//ngrx 
import { Store } from '@ngrx/store';
import * as fromTrainingReducer from '../../../ngRx-Store/training.reducer';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  motivationPhrases: string[] = [
    'No pain, no gain. Shut up and train.',
    'Keep on going, you can do it!',
    'Your body can stand almost anything. It’s your mind that you have to convince.',
    'Train insane or remain the same.',
    'Definition of a really good workout: when you hate doing it, but you love finishing it.'
  ];
  pickedMotivationPhrase: string = "";
  pickedMotivationIndex: number = 0;
  timer:any;

  progressStep = 0;
  progress = 0;
  progressTimer:any;

  runningExercise: ExerciseModel = <ExerciseModel>{};

  constructor(private dialog: MatDialog, 
    private trainingService: TrainingService, 
    private ngStore: Store<fromTrainingReducer.AppState>) { }

  ngOnInit(): void {
    //training is now using ngrx
    /*
    //get running exercise
    this.runningExercise = this.trainingService.getRunningExercise;
    */
    this.ngStore.select(fromTrainingReducer.getActiveTraining).pipe(take(1)).subscribe({
      next: (activeExercise: ExerciseModel) => {
        this.runningExercise = activeExercise;
      },
      error: (e) => {},
      complete: () => {}
    });

    this.pickedMotivationPhrase = this.pickRandomPhrase();

    //cycle through the motivational pharases and display 
    this.cycleThroughPhrases();

    this.initProgress();
  }

  ngOnDestroy(): void {
      console.log("current training destroy");
      this.clearTimer();
  }

  onStop(){
    console.log("current training onstop");
    this.clearTimer();

    //dialogue
    const dialogRef = this.dialog.open(StoptrainingDialogueComponent, 
                                                                    {
                                                                      data: {
                                                                        progress: this.progress
                                                                      }
                                                                    });
    //using dialog ref tap into the true/false being returned by the dialogue
    dialogRef.afterClosed().subscribe({
      next: (result:boolean) => {
        if(result){
          this.trainingService.cancelExercise(this.progress);
          return;  
        }
        //No continue
        this.cycleThroughPhrases();
        this.initProgress();
      },
      error: (e) => {},
      complete: () => {}
    });
  }

  private initProgress(){
    const step = this.runningExercise.duration / 100 * 1000;

    this.progressTimer = setInterval(() => {
      this.progress = this.progress + 1;
      this.progressStep = parseInt((this.runningExercise.duration * (this.progress / 100)).toString());
      if(this.progress >= 100){
        this.trainingService.completeExercise();
        this.clearTimer();
      }
    }, step);
  }

  private pickRandomPhrase() :string {
    var min = 0;
    var max = this.motivationPhrases.length-1;
    this.pickedMotivationIndex = Math.floor(Math.random() * (max - min + 1) + min);
    return this.motivationPhrases[this.pickedMotivationIndex];
  }

  //cycle through every 2 seconds
  private cycleThroughPhrases(){
    //console.log("cycleThroughPhrases");
    var index = (this.pickedMotivationIndex+1) >= this.motivationPhrases.length -1 ? 0 : this.pickedMotivationIndex + 1;
    this.timer = setInterval(() => { 
      //console.log("cycleThroughPhrases timer " + index);
      this.pickedMotivationIndex = index;
      this.pickedMotivationPhrase = this.motivationPhrases[index];
      index++;
      if(index > this.motivationPhrases.length -1){
        index = 0; //reset
      }
    }, 
    2000);
  }

  private clearTimer(){
    clearTimeout(this.timer);
    clearTimeout(this.progressTimer);
  }
}