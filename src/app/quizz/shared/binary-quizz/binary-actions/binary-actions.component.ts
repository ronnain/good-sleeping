import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'binary-actions',
    templateUrl: './binary-actions.component.html',
    styleUrls: ['./binary-actions.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgIf]
})
export class BinaryActionsComponent implements OnInit {

  @Input() hideBtnsChoice: boolean = false;

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
