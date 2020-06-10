import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-handler',
  templateUrl: './mail-handler.component.html',
  styleUrls: ['./mail-handler.component.css']
})
export class MailHandlerComponent implements OnInit {

  mailObject;
  mailBody;

  allMails;
  nbMails;

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;


  constructor(private mailService: MailService, private router: Router) { }

  ngOnInit() {
  }

  sendMailToAll() {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.mailService.sendMailToAll(this.mailObject, JSON.stringify(this.mailBody)).subscribe(
      data => {
        if(data.success === true) {
          if(data === "Token expiry") {
            this.router.navigate(['/admin']);
          }
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
    this.mailService.getAllContacts().subscribe(
      data => {
        if(data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
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
}
