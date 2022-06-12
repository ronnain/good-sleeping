import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/directives/google-analytics.service';

@Component({
  selector: 'ebook-form',
  templateUrl: './ebook-form.component.html',
  styleUrls: ['./ebook-form.component.css']
})
export class EbookFormComponent implements OnInit {

  @Output() userGetBonus = new EventEmitter<boolean>();
  @Output() userRefusesBonus = new EventEmitter<boolean>();

  mailStored: boolean = false;
  problemStored: boolean = false;

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
  }

  onUserGetBonus() {
    this.userGetBonus.emit(true);
  }

  onUserRefusesBonus() {
    this.userRefusesBonus.emit(true);
  }

  onMailStored() {
    this.mailStored = true;
    this.googleAnalyticsService.sendEvent(this.googleAnalyticsService.SUB_FROM_POPUP_EVENT, this.googleAnalyticsService.SUB_CATEGORIE, 'sub', 'popup');
  }

  onProblemStored(message: string) {
    this.problemStored = true;
    this.googleAnalyticsService.sendEvent(this.googleAnalyticsService.PROBLEM_STORED_FROM_QUIZZ_EVENT, this.googleAnalyticsService.SUBMIT_PROBLEM_CATEGORIE, 'message', message);

    setTimeout(() => {
      this.userGetBonus.emit(true);
    }, 3000);
  }

  onClose() {
    this.userGetBonus.emit(true);
  }

}