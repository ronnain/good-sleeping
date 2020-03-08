import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  secondPage:boolean = false;

  constructor() { }

  ngOnInit() {
  }


  @HostListener('window:scroll', ['$event'])
    scrollHandler(event) {
      if(document.getElementById("secondElement")){
        const rect = document.getElementById("secondElement").getBoundingClientRect();
        this.secondPage = rect.top === 0 ? true : false;
      }
  }

}
