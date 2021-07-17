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
  sideMovement: number = 0;
  isAnimationDone: boolean = true;
  animationStarts: number = 0;


  constructor() { }

  ngOnInit(): void {
    /* console.log('binaryQuestions', this.binaryQuestions); */
  }

  onNext() {
    if (!this.isAnimationDone || this.currentIndex + 1 === this.binaryQuestions.length) {
      return;
    }
    this.sideMovement++;
    this.currentIndex++;
  }

  onPrevious() {
    if (!this.isAnimationDone || !this.currentIndex) {
      return;
    }
    this.sideMovement--;
    this.currentIndex--;
  }

  onChoice(choice: boolean) {
    if (!this.isAnimationDone) {
      return;
    }

    this.binaryQuestions[this.currentIndex].answer = choice;

    if (this.currentIndex + 1 === this.binaryQuestions.length) {
      return;
    }
    this.sideMovement = choice ? this.sideMovement + 1 : this.sideMovement -1;
    this.currentIndex++;
  }

  onAnimationStart() {
    this.animationStarts++;
    this.isAnimationDone = false;
  }

  onAnimationDone() {
    this.animationStarts--;
    if (!this.animationStarts) {
      this.isAnimationDone = true;
    }
  }

}
