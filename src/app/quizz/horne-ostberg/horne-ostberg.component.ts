import { Component, OnInit } from '@angular/core';
import { CardQuestionDTO } from '../shared/card-quizz/card-question.dto';

@Component({
  selector: 'app-horne-ostberg',
  templateUrl: './horne-ostberg.component.html',
  styleUrls: ['./horne-ostberg.component.scss']
})
export class HorneOstbergComponent implements OnInit {

  currentIndex: number = 0;

  quizz: CardQuestionDTO[] = [
    {
      description: "Si tu vis à ton rythme (celui qui te plaît le plus), à quelle heure te lèverais-tu en étant entièrement libre d'organiser ta journée ?",
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
          value: 4
        }
      ]
    },
    {
      description: "A quelle moment de la soirée te sens-tu vraiment fatigué, au point de t'endormir ?",
      answerValue: 5,
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
    {
      description: "A quelle heure de la jouenée te sens-tu dans ta meilleure forme ?",
      answerValue: 5,
      propositions: [
        {
          text: '5h00 - 8h00',
          value: 5
        },
        {
          text: '8h00 - 10h00',
          value: 4
        },
        {
          text: '10h00 - 17h00',
          value: 3
        },
        {
          text: '17h00 - 21h00',
          value: 2
        },
        {
          text: '20h00 - 4h00',
          value: 1
        }
      ]
    },
    {
      description: "On dit parfois que quelqu'un est un \"sujet du soir\" ou un \"sujet du matin\". Te considères-tu comme celui du matin ou du soir ?",
      answerValue: 6,
      propositions: [
        {
          text: 'Tout à fait un sujet du matin',
          value: 6
        },
        {
          text: 'Plutôt un sujet du matin',
          value: 4
        },
        {
          text: 'Plutôt un sujet du soir',
          value: 2
        },
        {
          text: 'Tout à fait un sujet du soir',
          value: 0
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
