import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-retrieve-mail',
  templateUrl: './retrieve-mail.component.html',
  styleUrls: ['./retrieve-mail.component.css']
})
export class RetrieveMailComponent implements OnInit {
  //TO DO: use material input
  //mails: Mail[];
  firstName:string;
  showValidation: boolean = false;
  constructor(private mailService: MailService) {}

  ngOnInit() {
  }

  //Firebase
  /* saveMail(mailAdress:string){
    let mail:Contact ={
      id : "",
      mail : mailAdress,
      firstName: this.firstName,
      creationDate: new Date()
    }
    return this.mailService.saveMailInDB(mail);
  }

  updateMail(mail:Contact){
    this.mailService.updateMail(mail);
  }

  deleteMail(id: string){
    this.mailService.deleteMail(id);
  } */

  createContact(mailAdress:string){
    return this.mailService.createContact(this.firstName, mailAdress);
  }

  onSubmit(form: NgForm) {
    //this.showValidation = this.saveMail(form.value) ? true : false ;
    console.log("createContact", this.createContact(form.value));
  }
}
