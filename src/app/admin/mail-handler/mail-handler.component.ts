import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/shared/services/mail.service';
import { Router } from '@angular/router';
import { ReplaceLineBreaks } from '../pipes/replaceLinesBreaks';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
    selector: 'app-mail-handler',
    templateUrl: './mail-handler.component.html',
    styleUrls: ['./mail-handler.component.css'],
    standalone: true,
    imports: [MatTabsModule, MatTableModule, MatButtonModule, NgIf, MatProgressBarModule, MatFormFieldModule, MatInputModule, FormsModule, ReplaceLineBreaks]
})
export class MailHandlerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'mail', 'creationDate', 'source'];

  mailObject: string = '';
  mailBody: string = '';

  allMails = [];

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;


  constructor(private mailService: MailService, private router: Router) { }

  ngOnInit() {
    this.getAllMails();
  }

  sendMailToAll() {
    if (!this.isValidMail()) {
      alert("Add a link to a tag");
      return
    }
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

  private isValidMail():boolean {
    return !/href=('|")\s*\1/.test(this.mailBody);
  }
}
