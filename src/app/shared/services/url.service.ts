import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const gtag: Function;
@Injectable({providedIn: 'root'})
export class UrlService {

    SKIP_SUBSCRIBE_CREATION: string = "SKIP_SUBSCRIBE_CREATION";

    _skipCreation: boolean = false;
    set skipCreation(skipCreation: boolean) {
        this._skipCreation = skipCreation;
        localStorage.setItem(this.SKIP_SUBSCRIBE_CREATION, JSON.stringify(skipCreation));
    }

    get skipCreation(): boolean {
        return this._skipCreation || JSON.parse(localStorage.getItem(this.SKIP_SUBSCRIBE_CREATION));
    }


    skipPopup: boolean = false;
    isBrowser: boolean = false;

    noPopupPage = [
        "articles/test-severite-insomnie",
        "articles/test-depistage-apnee-sommeil",
        "articles/test-chronotype-animal",
        "bonus",
        "mentions",
        "contact",
        "",
    ]

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
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

    setSkipCreation(value: boolean) {
        this.skipCreation = value;
    }

    private checkSkipPopup(event) {

        if (/^\/admin/.test(event.url)) {
            this.skipPopup = true;
            return;
        }
        if (this.noPopupPage.indexOf(window.location.pathname.slice(1)) !== -1) {
            this.skipPopup = true;
            return;
        }
    }

    private checkSkipCreation() {
        if (this.skipCreation) {
            return;
        }

        const QueryString = window.location.search;
        const urlParams = new URLSearchParams(QueryString);

        if (urlParams.has('skipCreation')) {
            this.skipCreation = true;
            return;
        }
    }
}