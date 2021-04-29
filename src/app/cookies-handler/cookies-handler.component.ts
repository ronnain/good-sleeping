import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies-handler',
  templateUrl: './cookies-handler.component.html',
  styleUrls: ['./cookies-handler.component.css']
})
export class CookiesHandlerComponent implements OnInit {

  actionClicked: boolean = false;
  cookiesValidated: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkCookies()
  }

  checkCookies(){
    // To do fetch cookies
    this.cookiesValidated = false;
  }

  clickCookies(value: boolean){
    console.log("clickCookies ", value)
    // To do save data

    this.actionClicked = true;
  }

}
