import { Component, OnInit } from '@angular/core';
import { CardConfigurationDTO } from '../shared/binary-quizz/card-configuration.dto';

@Component({
  selector: 'app-horne-ostberg',
  templateUrl: './horne-ostberg.component.html',
  styleUrls: ['./horne-ostberg.component.scss']
})
export class HorneOstbergComponent implements OnInit {

  currentIndex: number = 0;

  test = 1;
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  cardConfiguration: CardConfigurationDTO = {
    showCardFooterActionBar: true,
    showThumbBar: false,
    questionType: 'other'
  }

  quizz: any[] = [
    {
      description: "Si tu vis à ton rythme (celui qui te plaît le plus), à quelle heure te lèverais-tu en étant entièrement libre d'organiser ta journée ?",
      showExtra: true,
      answerValue: 5,
      propositions: [
        {
          text: '5h00 - 6h30',
          value: 5
        },
        {
          text: '6h30 - 7h45',
          value: 4
        },
        {
          text: '7h45 - 9h45',
          value: 3
        },
        {
          text: '9h45 - 11h00',
          value: 2
        },
        {
          text: '11h00 - 12h00',
          value: 1
        },
      ]
    },
    {
      description: "Comment te sens-tu dans la demi-heure qui suit ton réveil ?",
      showExtra: true,
      answerValue: 1,
      propositions: [
        {
          text: 'Très fatigué',
          value: 1
        },
        {
          text: 'Relativement fatigué',
          value: 2
        },
        {
          text: 'Relativement en forme',
          value: 3
        },
        {
          text: 'Très en forme',
          value: 1
        }
      ]
    },
    {
      description: "A quelle moment de la soirée te sens-tu vraiment fatigué, au point de t'endormir ?",
      showExtra: true,
      answerValue: 1,
      propositions: [
        {
          text: '20h00 - 21h00',
          value: 5
        },
        {
          text: '21h00 - 22h15',
          value: 4
        },
        {
          text: '22H15 - 00h45',
          value: 3
        },
        {
          text: '00h45 - 2h00',
          value: 2
        },
        {
          text: '2h00 - 3h00',
          value: 1
        }
      ]
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
