import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Sommeil Profond';
  isBrowser;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (!environment.production) {
      return;
    }

    if (!this.isBrowser) {
      return;
    }

    this.addGAScript();
  }

  /** Add Google Analytics Script Dynamically */
  addGAScript() {
    const gtagScript: HTMLScriptElement = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.GA_TRACKING_ID;
    document.head.prepend(gtagScript);
    /** Disable automatic page view hit to fix duplicate page view count  **/
    gtag('config', environment.GA_TRACKING_ID, { send_page_view: false });
  }
}
