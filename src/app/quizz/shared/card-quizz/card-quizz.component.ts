import { isPlatformBrowser, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MobileService } from 'src/app/shared/services/mobile.service';
import { UrlService } from 'src/app/shared/services/url.service';
import { completeQuizz } from '../binary-quizz/animations/complete.animation';
import { IsAnswerSelectedPipe } from './card-answer-selected.pipe';
import { progressRatioPipe } from '../pipes/progress-ratio';
import { EmailFormComponent } from '../../../shared/retrieve-mail/email-form/email-form.component';
import { MatIconModule } from '@angular/material/icon';
import { SwipeDirective } from '../../../shared/directives/swipe.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'card-questions',
    templateUrl: './card-quizz.component.html',
    styleUrls: ['./card-quizz.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        completeQuizz
    ],
    standalone: true,
    imports: [NgClass, NgFor, NgIf, SwipeDirective, MatProgressBarModule, NgTemplateOutlet, MatButtonModule, MatIconModule, EmailFormComponent, progressRatioPipe, IsAnswerSelectedPipe]
})
export class CardQuizzComponent implements OnInit {


  @Input() cardQuestions: any[];

  @Input() questionTpl: TemplateRef<any> | null;

  @Input() quizzCompleteTpl: TemplateRef<any> | null;

  @Output() currentIndexChange = new EventEmitter<number>();

  @Input() disabled: boolean;

  @Input() handleSubribeCreation: boolean = false;


  get isQuizzCompleted(): boolean {
    return this.currentIndex === this.cardQuestions.length;
  }

  get needToSubscribe(): boolean {
    return this.handleSubribeCreation && !this.urlService.skipCreation && !this.userSubcribed;
  }

  userSubcribed: boolean = false;

  @Output() quizzComplete = new EventEmitter<boolean>();

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
    private mobileService: MobileService,
    private urlService: UrlService
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

    if (this.isQuizzCompleted) {
      this.quizzComplete.emit(true);
    }
  }

  onPrevious() {
    if (!this.isAnimationDone || !this.currentIndex) {
      return;
    }

    if (this.isQuizzCompleted) {
      this.quizzComplete.emit(false);
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

  onSubcribe() {
    this.userSubcribed = true;
  }

}
