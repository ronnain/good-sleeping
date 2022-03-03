import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { opacityAniamtion } from '../../animations/opacity.animation';
import { GoogleAnalyticsService } from '../../directives/google-analytics.service';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss'],
  animations: [
    opacityAniamtion,
    opacityAniamtion
  ]
})
export class ProblemFormComponent implements OnInit {

  PROBLEM_STORED_EVENT = "PROBLEM_STORED_EVENT";

  isLoading: boolean = false;
  isStored: boolean = false;
  storeProblemSubject: Subject<void> = new Subject<void>();

  @Output() problemStored = new EventEmitter<boolean>();

  reactiveForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get message() { return this.reactiveForm.get('message'); }

  problemSubscription: Subscription;

  constructor(
    private mailService: MailService,
    private googleAnalyticsService: GoogleAnalyticsService
    ) { }

  ngOnInit(): void {
    this.problemSubscription = this.storeProblemSubject.pipe(debounceTime(800)).subscribe(data => {
      this.storeContactProblem();
    });
  }

  onSubmit() {
    if (!this.reactiveForm.valid) {
      return;
    }
    this.isLoading = true;
    this.storeProblemSubject.next();
  }

  storeContactProblem() {
    const values = this.reactiveForm.value;
    this.mailService.storeContactProblem(values.message).subscribe(data=> {
      this.isStored = true;
      this.isLoading = false;
      this.reactiveForm.reset();
      this.problemStored.next(true);
      this.googleAnalyticsService.sendEvent(this.PROBLEM_STORED_EVENT, this.googleAnalyticsService.SUB_CATEGORIE, 'message', values.message);
    });
  }

  ngDestroy() {
    this.problemSubscription?.unsubscribe();
  }

}
