import { Component, OnInit } from '@angular/core';
import { LinkComponentComponent } from '../shared/component/link-component/link-component.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [MatButtonModule, LinkComponentComponent]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
