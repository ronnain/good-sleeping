import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ebook-form',
  templateUrl: './ebook-form.component.html',
  styleUrls: ['./ebook-form.component.css']
})
export class EbookFormComponent implements OnInit {

  @Output() userGetBonus = new EventEmitter<boolean>();
  @Output() userRefusesBonus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onUserGetBonus() {
    this.userGetBonus.emit(true);
  }

  onUserRefusesBonus() {
    this.userRefusesBonus.emit(true);
  }

}
