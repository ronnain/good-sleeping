import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  secondPage:boolean = false;
  bigScreen;
  bigScreenLimit = 709;

  constructor() { }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

}
