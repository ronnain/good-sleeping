import { Component, OnInit } from '@angular/core';
import { CardQuestionDTO } from '../shared/card-quizz/card-question.dto';
import { IS_DOLPHIN_QUESTIONS } from './biorythme-questions.ressources';

@Component({
  selector: 'app-chronotype-annimal',
  templateUrl: './chronotype-annimal.component.html',
  styleUrls: ['./chronotype-annimal.component.scss']
})
export class ChronotypeAnnimalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onDolphinQuizzComplet(isDolphin: boolean) {
    console.log('isDolphin', isDolphin);
  }

}
