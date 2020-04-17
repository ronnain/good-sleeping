import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MailService } from '../services/mail.service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-unsubcribe',
  templateUrl: './unsubcribe.component.html',
  styleUrls: ['./unsubcribe.component.css']
})
export class UnsubcribeComponent implements OnInit, Page {

  metaDesc = "Page de désabonnement à la newsletter.";

  unsubscribeKey;

  showValidation = false;
  failSave = false;
  loading = false;

  constructor(private _Activatedroute:ActivatedRoute, private mailService: MailService, private titleService:Title, private metaService:Meta) { }

  ngOnInit() {
    this.setTitle();
    this.handleMeta();
    this.removeStructuredData();
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

  setTitle() {
    this.titleService.setTitle("Désabonnement - Sommeil Profond");
  }

  handleMeta() {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: this.metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: this.metaDesc });
    }
  }

  removeStructuredData() {
    const structuredData = document.getElementById("structuredData");
    if(structuredData) {
      structuredData.remove();
    }
  }

}
