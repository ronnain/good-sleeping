import { Component, OnInit } from '@angular/core';
import { binaryQuestionDTO } from '../shared/binary-quizz/binary-question.dto';

@Component({
  selector: 'app-sahos',
  templateUrl: './sahos.component.html',
  styleUrls: ['./sahos.component.css']
})
export class SahosComponent implements OnInit {

  quizzNoSAS: binaryQuestionDTO[] = [
    {
      title: "Circonférence cou ",
      description: "Est-ce que ton tour de cou est supérieur à 40 cm ? (Mesuré au niveau de la pomme d'Adam)",
      value: 4
    },
    {
      title: "Indice de masse corporelle",
      description: "Est-ce que ton Indice de Masse Corporelle (IMC) se situe entre 25 et 30 ?",
      value: 3,
      showExtra: true
    },
    {
      title: "Indice de masse corporelle",
      description: "Est-ce que ton Indice de Masse Corporelle (IMC) est supérieur à 30 ?",
      value: 5,
      showExtra: true
    },
    {
      title: "Ronflement",
      description: "Est-ce que tu ronfles ?",
      value: 2
    },
    {
      title: "Age",
      description: "As-tu plus de 55 ans ?",
      value: 4
    },
    {
      title: "Sexe",
      description: "Est-tu un homme ?",
      value: 2
    },
  ];

  quizzStopBang: binaryQuestionDTO[] = [
    {
      title: "Tes Ronflements",
      description: "Ronflez-vous fort ? (suffisament fort pour qu'on vous entende à travers une porte fermée ou que votre partenaire vous donne des coups de coude parceque vous ronflez la nuit ?",
      value: 1
    },
    {
      title: "Ta fatigue",
      description: "Tu te sens souvent fatigué(e), épuisé(e) ou somnolent(e) pendant la journée (comme par exemple s'endormir au volant) ?",
      value: 1
    },
    {
      title: "Difficulté à respirer pendant ton sommeil",
      description: "Quelqu'un a-t-il déjà observé que tu arrêtes de respirer ou que tu étouffes/suffoques pendant ton sommeil ?",
      value: 1
    },
    {
      title: "Ta tension",
      description: "Es-tu atteint(e) d'hypertension artérielle ou es-tu traité(e) pour ce problème ?",
      value: 1
    },
    {
      title: "Indice de Masse Corporelle",
      description: "Est-ce que ton Indice de Masse Corporelle (IMC) est supérieur à 35 kg/m2 ?",
      value: 1,
      showExtra: true
    },
    {
      title: "Ton âge",
      description: "As-tu plus de 50 ans ?",
      value: 1
    },
    {
      title: "Ton tour de coup",
      description: "A mesurer au niveau de la pomme d'Adam.\nSi tu es un femme, ton tour de coup est-il supérieur ou égale à 41 cm ?\nSi tu es un homme, ton tour de coup est-il supérieur ou égale à 41 cm ?",
      value: 1
    },
    {
      title: "Sexe",
      description: "Es-tu un homme ?",
      value: 1
    }
  ];

  quizzNoSASNotCompleted: boolean = false;
  quizzStopBangNotCompleted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onGetScore() {
    this.quizzNoSASNotCompleted = false;
    this.quizzStopBangNotCompleted = false;
    let noSasScore: number = 0;
    let noStopBangScore: number = 0;

    this.quizzNoSAS.map(question => question.answer = false)
    this.quizzStopBang.map(question => question.answer = false)

    for (const question of this.quizzNoSAS) {
      if (! ('answer' in question)) {
        this.quizzNoSASNotCompleted = true;
        return;
      }

      noSasScore += question.answer ? question.value : 0;
    }

    for (const question of this.quizzStopBang) {

      if (! ('answer' in question)) {
        this.quizzStopBangNotCompleted = true;
        return;
      }

      noStopBangScore += question.answer ? question.value : 0;
    }
  }

}
