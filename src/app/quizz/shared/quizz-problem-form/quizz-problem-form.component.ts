import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'src/app/shared/directives/google-analytics.service';
import { ProblemFormComponent } from '../../../shared/retrieve-mail/problem-form/problem-form.component';

@Component({
    selector: 'quizz-problem-form',
    templateUrl: './quizz-problem-form.component.html',
    styleUrls: ['./quizz-problem-form.component.scss'],
    standalone: true,
    imports: [ProblemFormComponent]
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
