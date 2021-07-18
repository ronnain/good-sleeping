import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit {

  height:number;
  weight:number;
  bmi: number;
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

  onCalculBMI() {
    this.validateInputs();

    if (!this.height || !this.weight) {
      return;
    }

    this.bmi = Math.round((this.weight / (this.height * this.height /10000)) *100) / 100;
  }

  validateInputs() {
    const height = this.height?.toString().replace(/\D/g, "");
    const weight = this.weight?.toString().replace(/\D/g, "");

    this.height = height ? parseInt(height) : undefined;
    this.weight = weight ? parseInt(weight) : undefined;
  }
}
