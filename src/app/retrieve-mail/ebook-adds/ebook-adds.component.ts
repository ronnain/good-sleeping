import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ebook-adds',
  templateUrl: './ebook-adds.component.html',
  styleUrls: ['./ebook-adds.component.css']
})
export class EbookAddsComponent implements OnInit {

  hasUserAcceptsBonus = false;
  hasUserRefusedBonus = false;

  constructor() { }

  ngOnInit(): void {
  }

  userAcceptBonus() {
    this.hasUserAcceptsBonus = true;
  }
}
