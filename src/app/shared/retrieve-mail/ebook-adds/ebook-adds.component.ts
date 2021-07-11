import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'ebook-adds',
  templateUrl: './ebook-adds.component.html',
  styleUrls: ['./ebook-adds.component.css'],
  animations: [
    fadeIn
  ]
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

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
