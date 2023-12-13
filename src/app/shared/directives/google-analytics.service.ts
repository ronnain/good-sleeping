import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
   isBrowser;


   PROBLEM_STORED_FROM_MAIL_RETRIEVER_EVENT = "PROBLEM_STORED_EVENT";
   PROBLEM_STORED_FROM_QUIZZ_EVENT = "PROBLEM_STORED_EVENT";
   PROBLEM_STORED_FROM_POPUP_EVENT = "PROBLEM_STORED_EVENT";
   SUBMIT_PROBLEM_CATEGORIE = "SUMBIT_PROBLEM_CATEGORIE";

   SUB_MAIL_RETRIEVER_EVENT = "SUB_EVENT";
   SUB_FROM_QUIZZ_EVENT = "SUB_EVENT";
   SUB_FROM_POPUP_EVENT = "SUB_EVENT";
   SUB_CATEGORIE = "SUB_CATEGORIE";


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
            page: window.location.pathname,
            value: value
        }
    );
  }

}