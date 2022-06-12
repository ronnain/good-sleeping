import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardQuestionDTO } from '../../shared/card-quizz/card-question.dto';
import { BIORYTHME_QUESTIONS } from '../biorythme-questions.ressources';
import { Biorythme, BiorythmeScore } from '../biorythme.type';


@Component({
  selector: 'app-biorythme-quizz',
  templateUrl: './biorythme-quizz.component.html',
  styleUrls: ['./biorythme-quizz.component.scss']
})
export class BiorythmeQuizzComponent implements OnInit {

  biorythmeQuizz: CardQuestionDTO[] = BIORYTHME_QUESTIONS;
  currentIndex: number = 0;
  score: number = 0;

  get isUserADolphin() : boolean {
    return this.score >= 7;
  }

  @Output() biorythmeQuizzComplet = new EventEmitter<BiorythmeScore>();

  constructor() { }

  ngOnInit(): void {
  }

  onGetDolphinScore() {
    this.score = this.biorythmeQuizz.reduce((a,c) => a + c.answerValue , 0);
    this.biorythmeQuizzComplet.emit([this.getAnnimal(), this.score ]);
  }

  onPrevious() {
    this.currentIndex--;
  }

  getAnnimal() {
    if (this.score < 32) {
      return Biorythme.Lion;
    }
    if (this.score < 47) {
      return Biorythme.Bear;
    }

    return Biorythme.Wolf;
  }
}
