import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardQuestionDTO } from '../../shared/card-quizz/card-question.dto';
import { BIORYTHME_QUESTIONS } from '../biorythme-questions.ressources';
import { Biorythme, BiorythmeScore } from '../biorythme.type';
import { AnnimalPipe } from './animal.pipe';
import { AnimalPicturePipe } from './animal-picture.pipe';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardQuizzComponent } from '../../shared/card-quizz/card-quizz.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';


@Component({
    selector: 'app-biorythme-quizz',
    templateUrl: './biorythme-quizz.component.html',
    styleUrls: ['./biorythme-quizz.component.scss'],
    standalone: true,
    imports: [CardQuizzComponent, MatRadioModule, FormsModule, NgFor, MatButtonModule, AnimalPicturePipe, AnnimalPipe]
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
    this.biorythmeQuizzComplet.emit([this.getAnimal(), this.score ]);
  }

  onPrevious() {
    this.currentIndex--;
  }

  getAnimal() {
    if (this.score < 32) {
      return Biorythme.Lion;
    }
    if (this.score < 47) {
      return Biorythme.Bear;
    }

    return Biorythme.Wolf;
  }
}
