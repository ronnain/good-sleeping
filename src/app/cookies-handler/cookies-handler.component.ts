import { Component, OnInit } from '@angular/core';

const CookiesValidatedKey = "CookiesValidated"
@Component({
  selector: 'app-cookies-handler',
  templateUrl: './cookies-handler.component.html',
  styleUrls: ['./cookies-handler.component.css']
})
export class CookiesHandlerComponent implements OnInit {

  actionClicked: boolean = false;
  cookiesValidated: boolean = false;
  cookiesStored: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.checkCookies()
  }

  checkCookies(){
    this.cookiesValidated = false;
    const cookies= window.localStorage.getItem(CookiesValidatedKey);
    if(cookies === null) {
      this.cookiesStored = false;
    }
    else {
      const [cookiesValue, creationDate] = cookies.split(" ")

      const today = new Date();
      const todayFormatted = `${today.getMonth()}/${today.getFullYear()}`;

      if(this.areCookiesValid(creationDate, todayFormatted)){
        this.cookiesValidated = Boolean(cookiesValue);
        this.cookiesStored = true;
      }
      else {
        window.localStorage.removeItem(CookiesValidatedKey);
        this.cookiesStored = false;
      }
    }
  }

  areCookiesValid(date1: string, date2: string): boolean{
    const [month1 , year1] = date1.split("/").map(d => Number(d));
    const [month2 , year2] = date2.split("/").map(d => Number(d));

    const totalMonths1 = year1 * 12 + month1;
    const totalMonths2 = year2 * 12 + month2;
    console.log(totalMonths1);
    console.log(totalMonths2);

    return Math.abs(totalMonths2 - totalMonths1) < 6;
  }

  clickCookies(value: boolean){
    const today = new Date();

    window.localStorage.setItem(CookiesValidatedKey, `${value} ${today.getMonth()}/${today.getFullYear()}`);
    this.actionClicked = true;
  }

}
