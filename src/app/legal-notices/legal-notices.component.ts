import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-notices',
  templateUrl: './legal-notices.component.html',
  styleUrls: ['./legal-notices.component.css']
})
export class LegalNoticesComponent implements OnInit, Page {

  title = "Mentions légales - Hébergeur - Données personnelles";
  metaDesc = "Vous trouverez ici toutes les mentions légales du site Sommeil Profond, l'hébergeur et le traitement des données personnelles.";

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
