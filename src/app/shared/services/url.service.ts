import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const gtag: Function;
@Injectable({providedIn: 'root'})
export class UrlService {

    skipCreation: boolean = false;
    skipPopup: boolean = false;
    isBrowser: boolean = false;

    noPopupPage = [
        "articles/test-severite-insomnie",
        "articles/test-depistage-apnee-sommeil",
        "bonus",
        "mentions",
        "contact",
        "",
    ]

    constructor(
        private router: Router,
        @Inject(PLATFORM_ID) platformId: Object,
        ) {

        this.isBrowser = isPlatformBrowser(platformId);

        this.router.events.subscribe(event => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            if (environment.production && this.isBrowser) {
                /** START : Code to Track Page View  */
                gtag('event', 'page_view', {
                    page_path: event.urlAfterRedirects
                })
            }
            this.checkSkipPopup(event);
            this.checkSkipCreation();
        })
    }

    private checkSkipPopup(event) {

        if (/^\/admin/.test(event.url)) {
            this.skipPopup = true;
            return;
        }
        if (this.noPopupPage.indexOf(event.url.slice(1)) !== -1) {
            this.skipPopup = true;
            return;
        }
    }

    private checkSkipCreation() {
        this.skipCreation = false;

        const QueryString = window.location.search;
        const urlParams = new URLSearchParams(QueryString);

        if (urlParams.has('skipCreation')) {
            this.skipCreation = true;
            return;
        }
    }

}