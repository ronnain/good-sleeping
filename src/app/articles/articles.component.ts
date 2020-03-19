import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../modeles/interfaces.type';
import { ArticlesService } from '../services/articles.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input()
  articlesName: string[];

  @Input()
  currentArticleName: string;

  @Input()
  hideDescription: boolean = false;


  articles: Article[] = [];

  constructor(private articlesService: ArticlesService, private router: Router) { }

  ngOnInit() {
    //Display other articles
    if(this.currentArticleName){
      this.articles = this.articlesService.getOtherArticles(this.currentArticleName);

    } else if(this.articlesName){ //Display the list of articles
      this.articles = this.articlesService.getArticlesByNames(this.articlesName);

    } else { //display all articles
      this.articles = this.articlesService.getAllArticles();
    }
  }
}