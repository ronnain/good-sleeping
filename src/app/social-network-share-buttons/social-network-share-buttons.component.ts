import { isPlatformBrowser } from '@angular/common';
import { Inject, Input, PLATFORM_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'social-network-share-buttons',
  templateUrl: './social-network-share-buttons.component.html',
  styleUrls: ['./social-network-share-buttons.component.css']
})
export class SocialNetworkShareButtonsComponent implements OnInit {

  private isBrowser: boolean = false;

  articleUrl: string;
  @Input()
  articleImg: string;

  constructor( @Inject(PLATFORM_ID) platformId: Object,) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }
    this.articleUrl = window.location.href;
  }

}
