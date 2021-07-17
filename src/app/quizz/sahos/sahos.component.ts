import { Component, OnInit } from '@angular/core';
import { binaryQuestionDTO } from '../shared/binary-quizz/binary-question.dto';

@Component({
  selector: 'app-sahos',
  templateUrl: './sahos.component.html',
  styleUrls: ['./sahos.component.css']
})
export class SahosComponent implements OnInit {

  quizz: binaryQuestionDTO[] = [
    {
      title: "Tes Ronflements",
      description: "Ronflez-vous fort ? (suffisament fort pour qu'on vous entende à travers une porte fermée ou que votre partenaire vous donne des coups de coude parceque vous ronflez la nuit ?"
    },
    {
      title: "Ta fatigue",
      description: "Tu te sens souvent fatigué(e), épuisé(e) ou somnolent(e) pendant la journée (comme par exemple s'endormir au volant) ?"
    },
    {
      title: "Difficulté à respirer pendant ton sommeil",
      description: "Quelqu'un a-t-il déjà observé que tu arrêtes de respirer ou que tu étouffes/suffoques pendant ton sommeil ?"
    },
    {
      title: "Ta tension",
      description: "Es-tu atteint(e) d'hypertension artérielle ou es-tu traité(e) pour ce problème ?"
    },
    {
      title: "Ton âge",
      description: "As-tu plus de 50 ans ?"
    },
    {
      title: "Ton tour de coup",
      description: "A mesurer au niveau de la pomme d'Adam.\nSi tu es un femme, ton tour de coup est-il supérieur ou égale à 41 cm ?\nSi tu es un homme, ton tour de coup est-il supérieur ou égale à 41 cm ?"
    },
    {
      title: "Es-tu un homme ?",
      description: ""
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
