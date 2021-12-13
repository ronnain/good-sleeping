import { Component, Input, OnInit } from '@angular/core';
import { binaryQuestionDTO } from '../binary-quizz/binary-question.dto';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit {

  @Input() question: any;

  constructor() { }

  ngOnInit(): void {
  }

}
