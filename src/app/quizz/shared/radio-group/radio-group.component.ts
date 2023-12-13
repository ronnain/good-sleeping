import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.scss'],
    standalone: true,
    imports: [MatRadioModule, FormsModule, NgFor]
})
export class RadioGroupComponent implements OnInit {

  @Input() question: any;

  constructor() { }

  ngOnInit(): void {
  }

}
