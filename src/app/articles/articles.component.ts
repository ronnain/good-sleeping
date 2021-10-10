import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Article, Page } from '../modeles/interfaces.type';
import { ArticlesService } from '../shared/services/articles.service';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../shared/services/header.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, Page {

  title: string = "Les meilleurs articles et conseils pour retrouver le sommeil.";
  metaDesc = "Liste des meilleurs articles, guides et conseils pour retrouver le sommeil.";
  failSave: boolean = false;
  loading: boolean = false;

  imgPath = environment.serverConfig.imgPath;

  @Input()
  articlesName: string[];

  @Input()
  currentArticleName: string;

  @Input()
  hideDescription: boolean = false;

  @Output()
  loadArticleEvent = new EventEmitter<string>();

  articles: Article[] = [];

  constructor(
    private articlesService: ArticlesService,
    public headerService: HeaderService
    ) { }

  ngOnInit() {
    // Main page, otherwise it is called inside article component
    if(!this.currentArticleName) {
      this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    }
    this.getArticles();
  }

  getArticles() {
    this.failSave = false;
    this.loading = true;
    //Display other articles
    if(this.currentArticleName){
      this.articlesService.getOtherArticles(this.currentArticleName).subscribe(
        data => {
          this.articles = data;
          this.loading = false;
          this.handleNewBadgeDisplay();
        },
        err => {
          this.loading = false;
          this.failSave = true;
        });
    } else { //display all articles
      this.articlesService.getAllArticles().subscribe(
        data => {
          this.articles = data;
          this.loading = false;
          this.handleNewBadgeDisplay();
        },
        err => {
          this.loading = false;
          this.failSave = true;
        });
    }
  }

  loadArticle(articleName: string) {
    this.loadArticleEvent.emit(articleName);
  }

  ngOnChanges(changes: SimpleChanges) {
    // call from article component
    if (changes.currentArticleName && changes.currentArticleName.previousValue) {
      // call only when the user click on antoher article in artcile component
      this.getArticles();
    }
  }

  handleNewBadgeDisplay() {
    const previousMountDate = new Date();
    previousMountDate.setMonth(previousMountDate.getMonth() - 1);

    this.articles.forEach(article => {
      article.displayNewArticleBadge = new Date(article.datePublished) > previousMountDate;
    });
  }
}