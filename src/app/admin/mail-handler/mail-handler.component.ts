import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/shared/services/mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-handler',
  templateUrl: './mail-handler.component.html',
  styleUrls: ['./mail-handler.component.css']
})
export class MailHandlerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'mail', 'creationDate', 'source'];

  mailObject;
  mailBody;

  allMails = [];

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;


  constructor(private mailService: MailService, private router: Router) { }

  ngOnInit() {
    this.getAllMails();
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
        this.allMails.forEach(element => {
          if (element.source){
            element.source = element.source.split('/').pop();
          }
        });
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }
}
