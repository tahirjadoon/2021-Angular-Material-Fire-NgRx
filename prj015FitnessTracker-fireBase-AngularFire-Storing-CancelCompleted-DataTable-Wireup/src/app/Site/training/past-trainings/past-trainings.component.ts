import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { TrainingService } from '../../../Services/training.service';

import { ExerciseModel } from '../../../Models/exercise.model';



@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  pastExerciesSubscription: Subscription;
  //even though we are working with ExercisesModel array, we do not defined it as []
  dataSource = new MatTableDataSource<ExerciseModel>();
  displayedColumns = ['date','name', 'duration', 'calories', 'state'];
  
  //get reference to the matSort
  @ViewChild(MatSort) sort: MatSort;
  //paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    //attach dataSource to the dataTable
    //this.dataSource.data = this.trainingService.getPastExercises;
    this.pastExerciesSubscription = this.trainingService.pastExercisesSubject.subscribe(
      (pastExercises: ExerciseModel[]) => {
        this.dataSource.data = pastExercises;
    });
    this.trainingService.getPastExercises();
  }

  ngAfterViewInit(): void {
      //attach sort to dataSource
      this.dataSource.sort = this.sort;
      //pagination
      this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
      if(this.pastExerciesSubscription) this.pastExerciesSubscription.unsubscribe();
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
