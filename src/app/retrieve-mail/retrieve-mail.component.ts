import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Mail } from '../modeles/interfaces.type';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-retrieve-mail',
  templateUrl: './retrieve-mail.component.html',
  styleUrls: ['./retrieve-mail.component.css']
})
export class RetrieveMailComponent implements OnInit {
  //TO DO: use material input
  //mails: Mail[];
  mail: Mail;
  showValidation: boolean = false;
  //classBtn: string = "btn btn-primary";
  constructor(private mailService: MailService) {}

  ngOnInit() {
    /*this.mailService.getAllMails().subscribe(data =>{
      this.mails = data.map(e => {
        return {
          id: e.payload.doc.id,
          mail: e.payload.doc.data['mail'],
          creationDate: e.payload.doc.data['creationDate']
        } as Mail;        
      })
    });*/
  }

  saveMail(mailAdress:string){
    let mail:Mail ={
      id : "",
      mail : mailAdress,
      creationDate: new Date()
    }
    return this.mailService.saveMailInDB(mail);
  }

  updateMail(mail:Mail){
    this.mailService.updateMail(mail);
  }
  
  deleteMail(id: string){
    this.mailService.deleteMail(id);
  }

  onSubmit(form: NgForm) {
    this.showValidation = this.saveMail(form.value) ? true : false ;
    //this.classBtn = "btn btn-success";
  }
}
