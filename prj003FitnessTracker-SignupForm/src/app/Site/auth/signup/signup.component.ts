import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor() { }

  ngOnInit(): void {
    //set to min 18 years
    this.maxDate  = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onFormSubmit(form: NgForm){
    console.log(form);
  }

  

}
