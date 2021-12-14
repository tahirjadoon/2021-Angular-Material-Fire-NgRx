import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//stop training dialog components
import { StoptrainingDialogueComponent } from './stoptraining-dialogue/stoptraining-dialogue.component';

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

  progress = 0;
  progressTimer:any;

  @Output() trainingStopped = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.trainingStopped.emit();
        return;  
      }

      //No continue
      this.cycleThroughPhrases();
      this.initProgress();
      
    });
  }

  private initProgress(){
    this.progressTimer = setInterval(() => {
      this.progress = this.progress + 5;
      if(this.progress >= 100){
        this.clearTimer();
      }
    }, 1000);
  }

  private pickRandomPhrase() :string {
    var min = 0;
    var max = this.motivationPhrases.length-1;
    this.pickedMotivationIndex = Math.floor(Math.random() * (max - min + 1) + min);
    return this.motivationPhrases[this.pickedMotivationIndex];
  }

  //cycle through every 2 seconds
  private cycleThroughPhrases(){
    console.log("cycleThroughPhrases");
    var index = (this.pickedMotivationIndex+1) >= this.motivationPhrases.length -1 ? 0 : this.pickedMotivationIndex + 1;
    this.timer = setInterval(() => { 
      console.log("cycleThroughPhrases timer " + index);
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
