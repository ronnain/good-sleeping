import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardQuestionDTO } from '../../shared/card-quizz/card-question.dto';
import { IS_DOLPHIN_QUESTIONS } from '../biorythme-questions.ressources';
import { Biorythme, BiorythmeScore } from '../biorythme.type';

@Component({
  selector: 'app-dolphin-quizz',
  templateUrl: './dolphin-quizz.component.html',
  styleUrls: ['./dolphin-quizz.component.scss']
})
export class DolphinQuizzComponent implements OnInit {


  dolphinQuizz: CardQuestionDTO[] = IS_DOLPHIN_QUESTIONS;
  currentDolphinIndex: number = 0;
  dolphinScore: number = 0;

  get isUserADolphin() : boolean {
    return this.dolphinScore >= 7;
  }

  @Output() dolphinQuizzComplet = new EventEmitter<BiorythmeScore>();

  constructor() { }

  ngOnInit(): void {
  }

  onGetDolphinScore() {
    this.dolphinScore = this.dolphinQuizz.reduce((a,c) => a + c.answerValue , 0);
    this.dolphinQuizzComplet.emit([this.isUserADolphin ? Biorythme.Dolphin : null, this.dolphinScore]);
  }

  onPrevious() {
    this.currentDolphinIndex--;
  }
}
