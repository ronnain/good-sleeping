import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CardQuestionDTO } from '../../shared/card-quizz/card-question.dto';
import { DOLPHIN_QUESTIONS } from '../biorythme-questions.ressources';
import { Biorythme, BiorythmeScore } from '../biorythme.type';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardQuizzComponent } from '../../shared/card-quizz/card-quizz.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-dolphin-quizz',
    templateUrl: './dolphin-quizz.component.html',
    styleUrls: ['./dolphin-quizz.component.scss'],
    standalone: true,
    imports: [CardQuizzComponent, MatRadioModule, FormsModule, NgFor, MatButtonModule, MatIconModule]
})
export class DolphinQuizzComponent implements OnInit {


  dolphinQuizz: CardQuestionDTO[] = DOLPHIN_QUESTIONS;
  currentDolphinIndex: number = 0;
  score: number = 0;

  get isUserADolphin() : boolean {
    return this.score >= 7;
  }

  debouncedNextTest: Subject<void> = new Subject();

  @Output() dolphinQuizzComplet = new EventEmitter<BiorythmeScore>();
  @Output() nextTest = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.debouncedNextTest.pipe(debounceTime(300)).subscribe(() =>
      this.nextTest.emit()
    );
  }

  onGetScore() {
    this.score = this.dolphinQuizz.reduce((a,c) => a + c.answerValue , 0);
    this.dolphinQuizzComplet.emit([this.isUserADolphin ? Biorythme.Dolphin : null, this.score]);
  }

  onNextTest() {
    this.debouncedNextTest.next();
  }

  onPrevious() {
    this.currentDolphinIndex--;
  }

  ngOnDestroy() {
    this.debouncedNextTest.unsubscribe();
  }
}
