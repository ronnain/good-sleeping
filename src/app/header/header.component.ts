import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeColorService } from '../shared/services/theme-color.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isBrowser: boolean;

  bigScreen: boolean;
  bigScreenLimit = 768;

  darkTheme: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private themeColorService: ThemeColorService) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  ngOnInit() {
    if(this.isBrowser){
      this.bigScreen = screen.width >= this.bigScreenLimit;
    }
    this.darkTheme = this.themeColorService.isDarkTheme();
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

  changeThemeColor(event: any) {
    this.themeColorService.setDarkTheme(event);
  }

}
