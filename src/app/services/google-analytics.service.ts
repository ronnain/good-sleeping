import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
   isBrowser;

  constructor(
      @Inject(PLATFORM_ID) platformId: Object
      ) {
        this.isBrowser = isPlatformBrowser(platformId);
       }

  sendEvent(name: string, category: string, label: string, value: string) {
    if (!environment.production) {
        return;
    }

    if (!this.isBrowser) {
        return;
    }

    gtag(
        'event',
        name,
        {
            event_category: category,
            event_label: label,
            value: value
        }
    );
  }

}