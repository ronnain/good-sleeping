import { Component, OnInit } from '@angular/core';
import { DescArticle } from '../modeles/interfaces.type';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  descArticles: DescArticle[] = [
    {
      title: "Top 5 des choses qui nous gachent le sommeil",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      date: "10/11/2019",
      img: "assets/img/article1.jpg",
      articleName: "article1"
    },
    {
      title: "Top 5 des choses qui nous trompe le sommeil",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      date: "10/11/2019",
      img: "assets/img/article2.jpg",
      articleName: "article1"
    },
    {
      title: "Top 5 des choses qui aident pour le sommeil",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      date: "10/11/2019",
      img: "assets/img/article3.jpg",
      articleName: "article1"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
