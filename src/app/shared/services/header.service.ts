import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Renderer2, Inject, Injectable, PLATFORM_ID, Optional, InjectionToken, RendererFactory2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HOST_ID } from '../../host';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  isBrowser: boolean;
  private renderer2: Renderer2;

  constructor(
    private titleService:Title,
    private metaService:Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private _document,
    @Inject(PLATFORM_ID) platformId: Object,
    @Optional() @Inject(HOST_ID) private host: InjectionToken<string>
    ) {
      this.renderer2 = this.rendererFactory.createRenderer(null, null);
      this.isBrowser = isPlatformBrowser(platformId);

    }

  handleTitleAndMeta(title: string, metaDesc: string) {
      this.setTitle(title);
      this.handleMeta(metaDesc);
      this.removeStructuredData();
      this.removeOpenGraphMeta();
  }

  private setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  private handleMeta(metaDesc: string) {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: metaDesc });
    }
  }

  private removeStructuredData() {
    if (!this.isBrowser) {
      return;
    }
    const structuredData = document.getElementById("structuredData");
    if(structuredData) {
      structuredData.remove();
    }
  }

  private removeOpenGraphMeta() {
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:type'");
    this.metaService.removeTag("property='og:image'");
    this.metaService.removeTag("property='og:url'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:site_name'");
  }

  createOpenGraphMeta(title: string, desciption: string, imgPath: string) {
    const pageUrl = this.isBrowser ? window.location.href : '' + this.host;

    this.metaService.addTags([
      {
        property:'og:title', content: title
      },
      {
        property:'og:type', content: 'article'
      },
      {
        property:'og:image', content: imgPath, itemprop: "image"
      },
      {
        property:'og:url', content: pageUrl
      },
      {
        property:'og:description', content: desciption
      },
      {
        property:'og:site_name', content: "Sommeil Profond"
      },
    ])
  }

  createStructuredData(structuredData: string) {
    const scriptStructuredData = this.renderer2.createElement('script');
    scriptStructuredData.id = "structuredData";
    scriptStructuredData.type = "application/ld+json";
    scriptStructuredData.innerHTML = structuredData;

    this.renderer2.appendChild(this._document.head, scriptStructuredData);
  }
}