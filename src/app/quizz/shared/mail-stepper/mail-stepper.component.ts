import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MailService } from 'src/app/shared/services/mail.service';
import { UrlService } from 'src/app/shared/services/url.service';

@Component({
  selector: 'quizz-mail-stepper',
  templateUrl: './mail-stepper.component.html',
  styleUrls: ['./mail-stepper.component.css']
})
export class MailStepperComponent implements OnInit {

  @Output() onShowResult = new EventEmitter<null>();
  @Output() goToNextStep = new EventEmitter<null>();
  @Output() reset = new EventEmitter<null>();

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  skipCreation: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private mailService: MailService,
    private urlService: UrlService) { }

  ngOnInit(): void {
    this.skipCreation = this.urlService.skipCreation;
    this.nameFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.emailFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      rgpd: [false, Validators.requiredTrue]
    });
  }

  showResult() {
    this.onShowResult.emit();
  }

  onSubmit() {
    this.showResult();
    const nameformValue = this.nameFormGroup.value;
    const emailformValue = this.emailFormGroup.value;
    this.mailService.createContact(nameformValue['name'], emailformValue['email'].toLowerCase()).subscribe();
  }

  onNextStep() {
    this.goToNextStep.emit();
  }

  onReset() {
    this.reset.emit();
  }

  onSelectionChange(e) {
    if (this.skipCreation && e.selectedIndex === 2) {
      this.showResult();
    }
  }
}
