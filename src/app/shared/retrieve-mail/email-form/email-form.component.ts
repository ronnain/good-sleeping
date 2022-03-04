import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { GoogleAnalyticsService } from '../../directives/google-analytics.service';
import { MailService } from '../../services/mail.service';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  SUB_EVENT = "SUB_EVENT";

  @Input() fromComponent: string;

  @Output() mailStoredSuccess = new EventEmitter<boolean>();

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
    this.contactSubscription = this.bounceCreation.pipe(debounceTime(800)).subscribe(data => {
      this.storeContact();
    });
  }

  onSubmit(form: NgForm) {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.form = form;
    this.bounceCreation.next();
  }

  private storeContact() {

    this.mailService.createContact(this.form.value.firstName, this.form.value.email.toLowerCase()).pipe(take(1)).subscribe(
      data => {
        if(data.success === true) {
          this.showValidation = true;
          this.mailStoredSuccess.next(true);
          this.urlService.setSkipCreation(true);
          this.googleAnalyticsService.sendEvent(this.SUB_EVENT, this.googleAnalyticsService.SUB_CATEGORIE, 'fromComponent', this.fromComponent);
        } else {
          this.failSave = true;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }

  ngDestroy() {
    this.contactSubscription?.unsubscribe();
  }

}
