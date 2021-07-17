import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'binary-actions',
  templateUrl: './binary-actions.component.html',
  styleUrls: ['./binary-actions.component.css']
})
export class BinaryActionsComponent implements OnInit {

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() choice = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onNext() {
    this.next.emit();
  }

  onPrevious() {
    this.previous.emit();
  }

  onChoice(choice: boolean) {
    this.choice.emit(choice);
  }

}
