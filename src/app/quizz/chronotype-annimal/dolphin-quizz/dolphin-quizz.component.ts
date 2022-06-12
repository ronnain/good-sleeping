import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardQuestionDTO } from '../../shared/card-quizz/card-question.dto';
import { IS_DOLPHIN_QUESTIONS } from '../biorythme-questions.ressources';

export type IsDolphin = boolean;

@Component({
  selector: 'app-dolphin-quizz',
  templateUrl: './dolphin-quizz.component.html',
  styleUrls: ['./dolphin-quizz.component.scss']
})
export class DolphinQuizzComponent implements OnInit {
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

  @Output() dolphinQuizzComplet = new EventEmitter<IsDolphin>();

  constructor() { }

  ngOnInit(): void {
    this.isDolphinQuizz.forEach(question => question.propositions = this.trueFalsePropistions);
  }

  onGetDolphinScore() {
    this.dolphinScore = this.isDolphinQuizz.reduce((a,c) => a + c.answerValue , 0);
    this.dolphinQuizzComplet.emit(this.isUserADolphin);
  }

  onPrevious() {
    this.currentDolphinIndex--;
  }
}
