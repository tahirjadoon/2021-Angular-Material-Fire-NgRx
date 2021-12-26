import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stoptraining-dialogue',
  templateUrl: './stoptraining-dialogue.component.html',
  styleUrls: ['./stoptraining-dialogue.component.css']
})
export class StoptrainingDialogueComponent implements OnInit {
  progress: number;
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit(): void {
    this.progress = this.passedData.progress;
  }

}