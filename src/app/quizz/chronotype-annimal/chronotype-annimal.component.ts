import { Component, OnInit } from '@angular/core';
import { BiorythmeScore } from './biorythme.type';

@Component({
  selector: 'app-chronotype-annimal',
  templateUrl: './chronotype-annimal.component.html',
  styleUrls: ['./chronotype-annimal.component.scss']
})
export class ChronotypeAnnimalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onDolphinQuizzComplet(biorythmeScore: BiorythmeScore) {
    console.log('isDolphin', biorythmeScore);
  }

}
