import { Component, OnInit } from '@angular/core';
import { opacityAnimation } from '../animations/opacity.animation';
import { GoogleAnalyticsService } from '../directives/google-analytics.service';
import { MailService } from '../services/mail.service';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-retrieve-mail',
    templateUrl: './retrieve-mail.component.html',
    styleUrls: ['./retrieve-mail.component.scss'],
    animations: [
        opacityAnimation
    ],
    standalone: true,
    imports: [NgIf, EmailFormComponent, ProblemFormComponent, AsyncPipe]
})
export class RetrieveMailComponent implements OnInit {

  step = 0;


  constructor(
    public mailService: MailService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
  }

  ngOnInit() {
  }

  onMailStored(event) {
    this.step++;
    this.googleAnalyticsService.sendEvent(this.googleAnalyticsService.SUB_MAIL_RETRIEVER_EVENT, this.googleAnalyticsService.SUB_CATEGORIE, 'sub', 'retrieve-mail');
  }

  onProblemStored(message: string) {
    this.step++;
    this.googleAnalyticsService.sendEvent(this.googleAnalyticsService.PROBLEM_STORED_FROM_MAIL_RETRIEVER_EVENT, this.googleAnalyticsService.SUBMIT_PROBLEM_CATEGORIE, 'message', message);
  }
}
