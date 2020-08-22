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

  metaDesc = "Accueil Sommeil Profond. Site spécialisé dans les problèmes de sommeil. Tu trouveras ici ce qui cause tes problèmes de sommeil ou de fatigue et je te donne les meilleurs conseils pour les résoudre !";
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
