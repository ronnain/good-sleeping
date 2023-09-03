import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf, NgClass } from '@angular/common';
import { ThemeColorService } from '../shared/services/theme-color.service';
import { LinkComponentComponent } from '../shared/component/link-component/link-component.component';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, NgIf, MatSlideToggleModule, MatButtonModule, MatMenuModule, NgClass, LinkComponentComponent]
})
export class HeaderComponent implements OnInit {
  isBrowser: boolean;

  bigScreen: boolean;
  bigScreenLimit = 768;

  darkTheme: boolean = false;

  isBonusTabActive:boolean = false;
  isArticlesTabActive:boolean = false;
  isAProposTabActive:boolean = false;
  isContactTabActive:boolean = false;

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
