import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-mail-handler',
  templateUrl: './mail-handler.component.html',
  styleUrls: ['./mail-handler.component.css']
})
export class MailHandlerComponent implements OnInit {

  password;
  mailObject;
  mailBody;

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;


  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

  sendMailToAll() {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.mailService.sendMailToAll(this.mailObject, JSON.stringify(this.mailBody), this.password).subscribe(
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
