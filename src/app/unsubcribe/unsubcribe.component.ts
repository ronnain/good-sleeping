import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailService } from '../services/mail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unsubcribe',
  templateUrl: './unsubcribe.component.html',
  styleUrls: ['./unsubcribe.component.css']
})
export class UnsubcribeComponent implements OnInit {

  unsubscribeKey;

  showValidation = false;
  failSave = false;
  loading = false;

  constructor(private _Activatedroute:ActivatedRoute, private mailService: MailService) { }

  ngOnInit() {
    this.unsubscribeKey = this._Activatedroute.snapshot.paramMap.get("key");
  }

  onSubmit(form: NgForm) {
    if(!this.unsubscribeKey) {
      return;
    }
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.mailService.unsubscribe(this.unsubscribeKey).subscribe(
      data => {
        this.unsubscribeKey = undefined;
        this.showValidation = (data.success === true) ? true : this.failSave = true;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }

}
