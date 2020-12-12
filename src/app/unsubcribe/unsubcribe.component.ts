import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailService } from '../services/mail.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-unsubcribe',
  templateUrl: './unsubcribe.component.html',
  styleUrls: ['./unsubcribe.component.css']
})
export class UnsubcribeComponent implements OnInit, Page {

  title = "Désabonnement";
  metaDesc = "Page de désabonnement à la newsletter.";

  unsubscribeKey;

  showValidation = false;
  failSave = false;
  loading = false;

  constructor(
    private _Activatedroute:ActivatedRoute,
    private mailService: MailService,
    public headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
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
