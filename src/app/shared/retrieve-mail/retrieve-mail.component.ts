import { Component, OnInit } from '@angular/core';
import { opacityAniamtion } from '../animations/opacity.animation';

@Component({
  selector: 'app-retrieve-mail',
  templateUrl: './retrieve-mail.component.html',
  styleUrls: ['./retrieve-mail.component.scss'],
  animations: [
    opacityAniamtion
  ]
})
export class RetrieveMailComponent implements OnInit {

  step = 0;

  isMailStored: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  onMailStored(event) {
    this.isMailStored = event;
    this.step++;
  }

  onProblemStored() {
    this.step++;
  }
}
