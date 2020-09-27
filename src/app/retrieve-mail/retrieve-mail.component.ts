import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MailService } from '../services/mail.service';
import { NgForm } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-retrieve-mail',
  templateUrl: './retrieve-mail.component.html',
  styleUrls: ['./retrieve-mail.component.css']
})
export class RetrieveMailComponent implements OnInit {
  isBrowser: boolean;

  email: string;
  agreement: boolean = false;
  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;
  constructor(@Inject(PLATFORM_ID) platformId: Object, private mailService: MailService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;

    this.mailService.createContact(form.value.firstName, form.value.email.toLowerCase()).subscribe(
      data => {
        if(data.success === true) {
          this.showValidation = true;
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
}
