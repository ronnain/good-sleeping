import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Article, Page } from '../modeles/interfaces.type';
import { ArticlesService } from '../services/articles.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, Page {

  metaDesc = "Vous trouverez ici tous articles sur le sommeil.";

  @Input()
  articlesName: string[];

  @Input()
  currentArticleName: string;

  @Input()
  hideDescription: boolean = false;

  @Output()
  loadArticleEvent = new EventEmitter<string>();

  articles: Article[] = [];

  constructor(private articlesService: ArticlesService, private titleService:Title, private metaService:Meta) { }

  ngOnInit() {
    // Main page, otherwise it is called inside article component
    if(!this.currentArticleName) {
      this.setTitle();
      this.handleMeta();
    }
    this.getArticles();
  }

  getArticles() {
    //Display other articles
    if(this.currentArticleName){
      this.articles = this.articlesService.getOtherArticles(this.currentArticleName);

    } else if(this.articlesName){ //Display the list of articles
      this.articles = this.articlesService.getArticlesByNames(this.articlesName);

    } else { //display all articles
      this.articles = this.articlesService.getAllArticles();
    }
  }

  loadArticle(articleName: string) {
    this.loadArticleEvent.emit(articleName);
  }

  ngOnChanges(changes: SimpleChanges) {
    // call when the user select another article
    this.getArticles();
  }

  setTitle() {
    this.titleService.setTitle("Sommeil Profond - Articles");
  }

  handleMeta() {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: this.metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: this.metaDesc });
    }
  }
}
