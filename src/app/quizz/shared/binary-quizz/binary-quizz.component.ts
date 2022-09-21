import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { userChoice } from './animations/user-choice.animation';
import { backAction } from './animations/back-action.animation';
import { isPlatformBrowser } from '@angular/common';
import { MobileService } from 'src/app/shared/services/mobile.service';
import { binaryQuestionDTO } from './binary-question.dto';
import { completeQuizz } from './animations/complete.animation';

@Component({
  selector: 'binary-quizz',
  templateUrl: './binary-quizz.component.html',
  styleUrls: ['./binary-quizz.component.scss'],
  animations: [
    userChoice,
    backAction,
    completeQuizz
  ]
})
export class BinaryQuizzComponent implements OnInit {

  @Input() binaryQuestions: binaryQuestionDTO[];

  @Output() currentIndexChange = new EventEmitter<number>();

  @Input() set currentIndex(value: number) {
    this._currentIndex = value;
    this.currentIndexChange.emit(value);
  }

  get currentIndex() {
    return this._currentIndex;
  }

  @Input() set restart(value: number) {
    this._currentIndex = 0;
    this.sideMovement = 0;
    this.backMovement = 0;
    this.isAnimationDone = true;
    this.animationStarts = 0;
    this.hideBtnsChoice = false;
  }

  private _currentIndex: number = 0;
  sideMovement: number = 0;
  backMovement: number = 0;
  isAnimationDone: boolean = true;
  animationStarts: number = 0;
  hideBtnsChoice: boolean = false;

  isBrowser:boolean = true;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private mobileService: MobileService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
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

    this.currentIndex--;

    this.backMovement += this.binaryQuestions[this.currentIndex].answer ? 1 : -1;

    this.hideBtnsChoice =  this.currentIndex >= this.binaryQuestions.length;
  }

  onChoice(choice: boolean) {
    if (!this.isAnimationDone) {
      return;
    }
    this.binaryQuestions[this.currentIndex].answer = choice;
    this.currentIndex++;
    this.hideBtnsChoice = this.currentIndex >= this.binaryQuestions.length;
    this.sideMovement = choice ? this.sideMovement + 1 : this.sideMovement - 1;
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
