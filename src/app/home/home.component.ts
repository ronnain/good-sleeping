import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, Page {

  metaDesc = "Site spécialisé dans les problèmes de sommeil. Les meilleurs conseils, astuces, erreurs à éviter pour retrouver un sommeil de qualité et être en pleine forme.";
  imgFeatherPath = environment.serverConfig.imgPath+"fond_plume.png";

  constructor(private titleService:Title, private metaService:Meta) { }

  ngOnInit() {
    this.setTitle();
    this.handleMeta();
    this.removeStructuredData();
  }

  setTitle() {
    this.titleService.setTitle("Site spécialisé dans les problèmes de sommeil");
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
