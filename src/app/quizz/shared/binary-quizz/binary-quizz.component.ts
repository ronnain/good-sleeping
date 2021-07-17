import { Component, Input, OnInit } from '@angular/core';
import { leftRightCard } from './binary-card.animation';
import { binaryQuestionDTO } from './binary-question.dto';

@Component({
  selector: 'binary-quizz',
  templateUrl: './binary-quizz.component.html',
  styleUrls: ['./binary-quizz.component.css'],
  animations: [
    leftRightCard
  ]
})
export class BinaryQuizzComponent implements OnInit {

  @Input() binaryQuestions: binaryQuestionDTO[];

  currentIndex: number = 0;
  increment:boolean;

  currentQuestion:binaryQuestionDTO;

  constructor() { }

  ngOnInit(): void {
    /* console.log('binaryQuestions', this.binaryQuestions); */
    this.currentQuestion = this.binaryQuestions[0];
  }

  onNext() {
    this.increment = true;
    this.currentIndex++;
    this.currentQuestion = this.binaryQuestions[this.currentIndex];
  }

  onPrevious() {
    this.increment = false;
    this.currentIndex--;
    this.currentQuestion = this.binaryQuestions[this.currentIndex];
  }

  onChoice(choice: boolean) {
    this.currentQuestion.answer = choice;
    if(choice) {
      this.onNext();
      return;
    }
    this.onPrevious();
  }

}
