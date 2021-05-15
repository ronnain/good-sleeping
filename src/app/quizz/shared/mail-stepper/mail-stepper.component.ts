import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MailService } from 'src/app/shared/services/mail.service';

@Component({
  selector: 'quizz-mail-stepper',
  templateUrl: './mail-stepper.component.html',
  styleUrls: ['./mail-stepper.component.css']
})
export class MailStepperComponent implements OnInit {

  @Output() onShowResult = new EventEmitter<null>();

  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private mailService: MailService) { }

  ngOnInit(): void {
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

}
