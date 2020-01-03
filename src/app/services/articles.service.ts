import { Injectable } from '@angular/core';
import { DescArticle } from '../modeles/interfaces.type';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  articles: DescArticle[] = [
    {
      title: "Comment en finir avec les insomnies et retrouver toute sa forme grâce au livre Quand?",
      description: "Pensez vous avoir de bonnes habitudes de sommeil après avoir lu les conseilles du livre Quand? Vous buvez plusieurs tasses de café par jour ? Vous rattrapez le sommeil en retard le weekend ? Vous avez du mal à vous endormir le dimanche soir ? Le livre Quand? est là pour vous.",
      date: "01/01/2020",
      img: "assets/img/quand.jpg",
      articleName: "quandReview"
    },
    {
      title: "Comment devenir la personne que l'on souhaite avec le livre Miracle Morning?",
      description: "Vous avez dèjà lu des conseilles en développement personnel mais vous ne parvenez pas à les mettre en pratique par manque de temps ?  Dans le livre, Miracle Morning de Hal Elrod, une méthode propose de se lever plus tôt afin de mettre en place des habithudes pour réussir dans tous les domaines de la vie. Je propose dans cet article une revue de son livre.",
      date: "03/01/2020",
      img: "assets/img/miracleMorning.jpg",
      articleName: "miracleMorningReview"
    },
    {
      title: "Top 5 des choses qui aident pour le sommeil",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      date: "10/11/2019",
      img: "assets/img/article3.jpg",
      articleName: "article1"
    }
  ]

  getAllArticles(): DescArticle[]{
    return this.articles;
  }

  getArticlesByNames(articlesName: string[]): DescArticle[]{
    return this.articles.filter(article => articlesName.indexOf(article.articleName) === -1);
  }

  getOtherArticles(articleName: string): DescArticle[]{
    return this.articles.filter(article => articleName.indexOf(article.articleName) === -1);
  }

  constructor() { }
}
