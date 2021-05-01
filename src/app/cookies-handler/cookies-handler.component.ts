import { trigger, transition, style, animate, state } from '@angular/animations';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ScriptLoaderService, ScriptModel } from '../services/script.service';

@Component({
  selector: 'app-cookies-handler',
  templateUrl: './cookies-handler.component.html',
  styleUrls: ['./cookies-handler.component.css'],
  animations: [
    trigger('up-down', [
      transition(':enter', [
        style({ transform: 'translateY(100px)'}),
        animate('300ms ease-in-out', style({  transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({transform: ' translateY(100px)' }))
      ])
    ]),
  ]
})
export class CookiesHandlerComponent implements OnInit {
  isBrowser: boolean;
  actionClicked: boolean = false;
  isCookiesAuthorized = true; // true: avoid the popup display at the initialisation
  cookiesAuthorizedKey = 'userAcceptAllCookies';

  googleAnalyticsScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-Z7E5RVJDW4');
  `;

  googleAnalyticsScriptSrc: ScriptModel = {
    name: 'Google Analytics',
    src: "https://www.googletagmanager.com/gtag/js?id=G-Z7E5RVJDW4",
    loaded: false
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    private scriptLoaderService: ScriptLoaderService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  ngOnInit(): void {
    if (!this.isBrowser) { // not run on ssr
      return;
    }
    this.checkCookies()
  }

  checkCookies(){

    const regexCookieAuthorisation = new RegExp(this.cookiesAuthorizedKey);
    this.isCookiesAuthorized = regexCookieAuthorisation.test(document.cookie);

    if (this.isCookiesAuthorized) {
      this.insertGoogleAnalystics();
    }
    // The cookie will be removed at the expiracy date
  }

  clickCookies(value: boolean){
    this.actionClicked = true;

    if (!value) { // User refuses to store cookies
      // balek, ask cookie authorization at the next visite
      return;
    }

    // User Authorized the cookies
    const expiracyDate = new Date();
    expiracyDate.setDate(expiracyDate.getDate() + 365); // Expire after one year

    // Save user authorization
    document.cookie = `${this.cookiesAuthorizedKey}=true;expires=${expiracyDate.toUTCString()};path=/`;

    this.insertGoogleAnalystics();
  }

  insertGoogleAnalystics() {

     const googleAnalyticsHeaderTag =  this.renderer2.createElement('script');
     googleAnalyticsHeaderTag.innerHTML = this.googleAnalyticsScript;
     this.renderer2.appendChild(document.head, googleAnalyticsHeaderTag);

     this.scriptLoaderService.load(this.googleAnalyticsScriptSrc).subscribe();
 }

}
