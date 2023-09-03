import { isPlatformBrowser, NgIf, NgClass } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { popupBonus } from '../../../animations/popup-bonus.animation';
import { UrlService } from '../../../services/url.service';
import { EbookFormComponent } from '../ebook-form/ebook-form.component';
import { EbookAddsComponent } from '../ebook-adds/ebook-adds.component';

@Component({
    selector: 'ebook-popup',
    templateUrl: './ebook-popup.component.html',
    styleUrls: ['./ebook-popup.component.css'],
    animations: [
        popupBonus
    ],
    standalone: true,
    imports: [NgIf, NgClass, EbookAddsComponent, EbookFormComponent]
})
export class EbookPopupComponent implements OnInit {

  userAcceptsBonus = false;
  userRefusesBonus = false;
  userGetBonus = false;
  popupTriggered = false;
  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private renderer: Renderer2,
    private urlService: UrlService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }
    this.setTimer();
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    const verticalOffset = window.pageYOffset
          || document.documentElement.scrollTop
          || document.body.scrollTop || 0;
    // Scroll reached the middle of the page
    if (verticalOffset > document.body.scrollHeight / 2) {
      this.showPopup();
    }
  }

  setTimer() {
    timer(60000).pipe(take(1)).subscribe(val => {
      this.showPopup();
    });
  }

  showPopup() {
    // Show only one time the popup
    if (this.popupTriggered || this.urlService.skipPopup) {
      return;
    }
    this.popupTriggered = true;
    this.renderer.addClass(document.body, 'hiddenScroll');
  }

  onClosePopup() {
    this.renderer.removeClass(document.body, 'hiddenScroll');
  }
}