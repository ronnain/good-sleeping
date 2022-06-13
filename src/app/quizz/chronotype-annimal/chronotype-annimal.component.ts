import { Component, OnInit } from '@angular/core';
import { BiorythmeScore } from './biorythme.type';

@Component({
  selector: 'app-chronotype-annimal',
  templateUrl: './chronotype-annimal.component.html',
  styleUrls: ['./chronotype-annimal.component.scss']
})
export class ChronotypeAnnimalComponent implements OnInit {

  testIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onQuizzComplet(biorythmeScore: BiorythmeScore) {
    console.log('biorythmeScore', biorythmeScore);
  }

  onNextTest() {
    this.testIndex++;
  }
}
