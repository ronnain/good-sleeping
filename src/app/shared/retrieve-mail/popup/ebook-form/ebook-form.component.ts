import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProblemFormComponent } from '../../problem-form/problem-form.component';
import { EmailFormComponent } from '../../email-form/email-form.component';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GoogleAnalyticsService } from '../../../directives/google-analytics.service';

@Component({
    selector: 'ebook-form',
    templateUrl: './ebook-form.component.html',
    styleUrls: ['./ebook-form.component.css'],
    standalone: true,
    imports: [MatIconModule, NgIf, EmailFormComponent, ProblemFormComponent]
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
