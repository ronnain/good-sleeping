import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, Page {

  title = "Contact - Adresse mail - Sommeil Profond";
  metaDesc = "Contact Sommeil Profond - Comment me contacter ? Adresse mail pour me contacter.";

  constructor(private titleService:Title, private metaService:Meta) { }

  ngOnInit() {
    this.setTitle();
    this.handleMeta();
    this.removeStructuredData();
  }

  setTitle() {
    this.titleService.setTitle(this.title);
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
