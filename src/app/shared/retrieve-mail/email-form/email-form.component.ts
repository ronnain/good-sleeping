import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GoogleAnalyticsService } from '../../directives/google-analytics.service';
import { MailService } from '../../services/mail.service';
import { UrlService } from '../../services/url.service';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.scss'],
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, NgIf, MatCheckboxModule, MatProgressBarModule]
})
export class EmailFormComponent implements OnInit {

  @Input() fromComponent: string;

  @Output() mailStoredSuccess = new EventEmitter<boolean>();

  @Output() submitEmail = new EventEmitter<void>();

  email: string;
  agreement: boolean = false;
  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;
  form: NgForm;

  bounceCreation: Subject<void> = new Subject<void>();
  contactSubscription: Subscription;

  constructor(
    private mailService: MailService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private urlService: UrlService
    ) { }

  ngOnInit(): void {
    this.contactSubscription = this.bounceCreation.pipe(debounceTime(800)).subscribe(() => {
      this.mailService.storeContact(this.form.value.firstName, this.form.value.email);
    });
    this.bounceCreation.pipe(
      debounceTime(800),
      switchMap(() => {
        return this.mailService.storeContact(this.form.value.firstName, this.form.value.email);
      })
      ).subscribe(
        () => {
          this.showValidation = true;
          this.mailStoredSuccess.next(true);
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.failSave = true;
        }
      )
  }

  onSubmit(form: NgForm) {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.form = form;
    this.bounceCreation.next();
    this.submitEmail.next();
  }

  ngDestroy() {
    this.contactSubscription?.unsubscribe();
  }

}
