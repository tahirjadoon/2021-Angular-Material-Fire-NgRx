import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  //make true when ever we have a running training
  ongoingTraining = false;

  constructor() { }

  ngOnInit(): void {
  }
}
