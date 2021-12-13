import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { MobileService } from 'src/app/shared/services/mobile.service';
import { completeQuizz } from '../binary-quizz/animations/complete.animation';

@Component({
  selector: 'card-questions',
  templateUrl: './card-quizz.component.html',
  styleUrls: ['./card-quizz.component.scss'],
  animations: [
    completeQuizz
  ]
})
export class CardQuizzComponent implements OnInit {

  @Input() cardQuestions: any[];

  @Output() currentIndexChange = new EventEmitter<number>();

  @Input() set currentIndex(value: number) {
    this._currentIndex = value;
    this.currentIndexChange.emit(value);
  }

  get currentIndex() {
    return this._currentIndex;
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
    private mobileService: MobileService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  onNext() {
    if (!this.isAnimationDone || this.currentIndex === this.cardQuestions.length) {
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

    this.backMovement += 1;

    this.hideBtnsChoice =  this.currentIndex >= this.cardQuestions.length;
  }

  onChoice(choice: boolean) {
    if (!this.isAnimationDone) {
      return;
    }
    this.cardQuestions[this.currentIndex].answer = choice;
    this.currentIndex++;
    this.hideBtnsChoice = this.currentIndex >= this.cardQuestions.length;
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
