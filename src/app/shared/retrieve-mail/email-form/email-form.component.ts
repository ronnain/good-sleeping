import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  @Output() mailStored = new EventEmitter<boolean>();

  email: string;
  agreement: boolean = false;
  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;

  constructor(private mailService: MailService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;

    this.mailService.createContact(form.value.firstName, form.value.email.toLowerCase()).subscribe(
      data => {
        if(data.success === true) {
          this.showValidation = true;
          this.onMailStored();
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

  onMailStored() {
    setTimeout(()=>{
      this.mailStored.emit(true);
    }, 4000);
  }

}
