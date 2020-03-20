import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  secondPage:boolean = false;
  bigScreen;
  bigScreenLimit = 700;

  constructor() { }

  ngOnInit() {
    this.bigScreen = screen.width >= this.bigScreenLimit;
  }


  @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
      if(document.getElementById("secondElement")){
        const rect = document.getElementById("secondElement").getBoundingClientRect();
        this.secondPage = rect.top === 0 ? true : false;
      }
  }

  @HostListener('window:resize', ['$event'])
    displaySize(event) {
     this.bigScreen = screen.width > this.bigScreenLimit;
  }

}
