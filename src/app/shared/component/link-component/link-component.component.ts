import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationEnd, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'alink',
    templateUrl: './link-component.component.html',
    styleUrls: ['./link-component.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, RouterLink, NgClass]
})
export class LinkComponentComponent implements OnInit {

  @Input()
  routerPath: string;

  @Input()
  linkCategory: 'header' | 'article' | 'footer' | 'logo';

  @Input()
  linkClass: string = '';

  @Input()
  linkContent: string;

  @Output()
  activeLink: EventEmitter<boolean> = new EventEmitter<boolean>();


  private routesConfig = [
      {
          pathRegex : '^/$',
          authorized: ['header', 'footer']
      },
      {
          pathRegex : '^/articles',
          authorized: ['article']
      },
      {
          pathRegex: '',
          authorized: ['logo']
      }
  ];

  isSpanTag:boolean = false;
  isActiveLink:boolean = false;
  activeClass:string = '';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {

      if (!(event instanceof NavigationEnd)) {
          return;
      }

      const currentRouteConfig = this.getRouteConfig(event.url);

      this.isSpanTag = currentRouteConfig.authorized.indexOf(this.linkCategory) === -1;
      this.isActiveLink = ('/' + this.routerPath) === event.url;
      this.activeLink.next(this.isActiveLink);
      this.activeClass = this.isActiveLink? 'activeLink' : '';
    });
  }

  private getRouteConfig(url:string): any {
    for (const route of this.routesConfig) {
      const pathRegex = new RegExp(route.pathRegex);
      if (pathRegex.test(url)) {
          return route;
      }
    }
    return null;
  }

  onGoToPath(): void {
    this.router.navigate([this.routerPath]);
  }

}
