import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isBrowser: boolean;

  bigScreen: boolean;
  bigScreenLimit = 768;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  ngOnInit() {
    if(this.isBrowser){
      this.bigScreen = screen.width >= this.bigScreenLimit;
    }
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

}
