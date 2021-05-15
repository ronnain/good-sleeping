import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ebook-adds',
  templateUrl: './ebook-adds.component.html',
  styleUrls: ['./ebook-adds.component.css']
})
export class EbookAddsComponent implements OnInit {

  @Output() userAcceptsBonus = new EventEmitter<boolean>();
  @Output() userRefusesBonus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onUserAcceptsBonus() {
    this.userAcceptsBonus.emit(true);
  }

  onUserRefusesBonus() {
    this.userRefusesBonus.emit(true);
  }
}
