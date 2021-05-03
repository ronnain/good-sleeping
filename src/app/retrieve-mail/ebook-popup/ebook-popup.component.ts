import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ebook-popup',
  templateUrl: './ebook-popup.component.html',
  styleUrls: ['./ebook-popup.component.css']
})
export class EbookPopupComponent implements OnInit {

  hasUserAcceptsBonus = false;
  hasUserRefusedBonus = false;

  constructor() { }

  ngOnInit(): void {
    console.log("display");

  }

  userAcceptBonus() {
    this.hasUserAcceptsBonus = true;
  }

}
