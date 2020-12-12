import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor( private titleService:Title, private metaService:Meta) { }

  handleTitleAndMeta(title: string, metaDesc: string) {
      this.setTitle(title);
      this.handleMeta(metaDesc);
      this.removeStructuredData();
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  handleMeta(metaDesc: string) {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: metaDesc });
    }
  }

  removeStructuredData() {
    const structuredData = document.getElementById("structuredData");
    if(structuredData) {
      structuredData.remove();
    }
  }
}