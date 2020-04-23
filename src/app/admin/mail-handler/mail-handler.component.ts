import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { AdminPage } from 'src/app/modeles/interfaces.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mail-handler',
  templateUrl: './mail-handler.component.html',
  styleUrls: ['./mail-handler.component.css']
})
export class MailHandlerComponent implements OnInit, AdminPage {

  password;
  mailObject;
  mailBody;

  passwordGetMails;
  allMails;
  nbMails;

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;


  constructor(private mailService: MailService, private authService: AuthService) { }

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

  getAllMails() {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.mailService.getAllContacts(this.passwordGetMails).subscribe(
      data => {
        this.allMails = data;
        this.getMailsFromContacts(data);
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }

  getMailsFromContacts(contacts) {
    const arrayAllMails = [];
    for (let contact of contacts) {
      arrayAllMails.push(contact.mail);
    }
    this.nbMails = arrayAllMails.length;
    this.allMails = arrayAllMails.join("; ");
  }

  logout() {
    this.authService.userLogout();
  }

}
