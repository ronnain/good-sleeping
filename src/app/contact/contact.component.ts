import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, Page {

  metaDesc = "Page pour me contacter - Sommeil Profond";

  constructor(private titleService:Title, private metaService:Meta) { }

  ngOnInit() {
    this.setTitle();
    this.handleMeta();
  }

  setTitle() {
    this.titleService.setTitle("Sommeil Profond - Contact");
  }

  handleMeta() {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: this.metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: this.metaDesc });
    }
  }
}