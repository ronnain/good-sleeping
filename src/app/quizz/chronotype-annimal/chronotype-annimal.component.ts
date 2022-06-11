import { Component, OnInit } from '@angular/core';
import { CardQuestionDTO } from '../shared/card-quizz/card-question.dto';
import { IS_DOLPHIN_QUESTIONS } from './biorythme-questions.ressources';

@Component({
  selector: 'app-chronotype-annimal',
  templateUrl: './chronotype-annimal.component.html',
  styleUrls: ['./chronotype-annimal.component.scss']
})
export class ChronotypeAnnimalComponent implements OnInit {

  trueFalsePropistions = [
    {
      text: 'Vrai',
      value: 1
    },
    {
      text: 'Faux',
      value: 0
    },
  ];

  isDolphinQuizz: CardQuestionDTO[] = IS_DOLPHIN_QUESTIONS;
  currentDolphinIndex: number = 0;
  dolphinScore: number = 0;

  get isUserADolphin() : boolean {
    return this.dolphinScore >= 7;
  }

  constructor() { }

  ngOnInit(): void {
    this.isDolphinQuizz.forEach(question => question.propositions = this.trueFalsePropistions);
  }

  onGetDolphinScore() {
    this.dolphinScore = this.isDolphinQuizz.reduce((a,c) => a + c.answerValue , 0);
  }

  onPrevious() {
    this.currentDolphinIndex--;
  }
}
