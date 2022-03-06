import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { opacityAnimation } from 'src/app/shared/animations/opacity.animation';
import { GoogleAnalyticsService } from 'src/app/shared/directives/google-analytics.service';
import { MailService } from 'src/app/shared/services/mail.service';
import { UrlService } from 'src/app/shared/services/url.service';

@Component({
  selector: 'quizz-mail-stepper',
  templateUrl: './mail-stepper.component.html',
  styleUrls: ['./mail-stepper.component.css'],
  animations: [
    opacityAnimation
  ]
})
export class MailStepperComponent implements OnInit {

  @Output() onShowResult = new EventEmitter<null>();
  @Output() goToNextStep = new EventEmitter<null>();
  @Output() reset = new EventEmitter<null>();

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  skipCreation: boolean = false;
  bounceCreation: Subject<void> = new Subject<void>();
  showProblemForm: boolean = false;
  stepIndex = 0;

  contactSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    public mailService: MailService,
    private urlService: UrlService,
    private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.skipCreation = this.urlService.skipCreation;
    this.showProblemForm = this.skipCreation;
    this.nameFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.emailFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      rgpd: [false, Validators.requiredTrue]
    });
    this.contactSubscription = this.bounceCreation.pipe(debounceTime(800)).subscribe(data => {
      this.storeContact();
    });
  }

  showResult() {
    this.onShowResult.emit();
  }

  onSubmit() {
    this.showResult();
    this.skipCreation = true;
    this.urlService.setSkipCreation(true);
    this.showProblemForm = true;
    this.bounceCreation.next();
  }

  onNextStep() {
    this.goToNextStep.emit();
  }

  onReset() {
    this.reset.emit();
  }

  onRestart() {
    this.reset.emit();
  }

  onSelectionChange(e) {
    if (this.skipCreation && e.selectedIndex === 2) {
      this.showResult();
    }
  }

  onGoToResultStep() {
    this.stepIndex = 2;
  }

  private storeContact() {
    this.mailService.createContact(this.nameFormGroup.value['name'], this.emailFormGroup.value['email'].toLowerCase()).subscribe(
      data => {
        if(!data['success']) {
          return;
        }
        this.mailService.$isMailSotred.next(true);
        this.googleAnalyticsService.sendEvent(this.googleAnalyticsService.SUB_FROM_QUIZZ_EVENT, this.googleAnalyticsService.SUB_CATEGORIE, 'sub', 'quizz');
      }
    );

  }

  ngDestroy() {
    this.contactSubscription?.unsubscribe();
  }
}
