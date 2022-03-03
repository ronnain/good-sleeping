import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  bounceCreation: Subject<void> = new Subject<void>();

  contactSubscription: Subscription;

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
    this.urlService.skipCreation = true;
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

  private storeContact() {
    this.mailService.createContact(this.nameFormGroup.value['name'], this.emailFormGroup.value['email'].toLowerCase()).subscribe();

  }

  ngDestroy() {
    this.contactSubscription?.unsubscribe();
  }
}
