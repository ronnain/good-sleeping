import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/directives/google-analytics.service';

@Component({
  selector: 'quizz-problem-form',
  templateUrl: './quizz-problem-form.component.html',
  styleUrls: ['./quizz-problem-form.component.scss']
})
export class QuizzProblemFormComponent implements OnInit {

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
  }

  onProblemStored(message: string) {
    this.googleAnalyticsService.sendEvent(this.googleAnalyticsService.PROBLEM_STORED_FROM_QUIZZ_EVENT, this.googleAnalyticsService.SUBMIT_PROBLEM_CATEGORIE, 'message', message);
  }

}
