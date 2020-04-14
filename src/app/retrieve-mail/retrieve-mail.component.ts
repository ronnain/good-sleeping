import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-retrieve-mail',
  templateUrl: './retrieve-mail.component.html',
  styleUrls: ['./retrieve-mail.component.css']
})
export class RetrieveMailComponent implements OnInit {
  firstName:string;
  agreement: boolean = false;
  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;
  constructor(private mailService: MailService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.mailService.createContact(this.firstName, form.value).subscribe(
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
