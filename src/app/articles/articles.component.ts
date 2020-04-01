import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Article, Page } from '../modeles/interfaces.type';
import { ArticlesService } from '../services/articles.service';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, Page {

  metaDesc = "Vous trouverez ici tous articles avec les meilleurs conseils sur le sommeil.";
  failSave: boolean = false;
  loading: boolean = false;

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
    this.failSave = false;
    this.loading = true;
    //Display other articles
    if(this.currentArticleName){
      this.articlesService.getOtherArticles(this.currentArticleName).subscribe(
        data => {
          this.articles = data;
          this.loading = false;
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

  setTitle() {
    this.titleService.setTitle("Articles - Sommeil Profond");
  }

  handleMeta() {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: this.metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: this.metaDesc });
    }
  }

  getPathImg(imgName: string) {
    return environment.serverConfig.imgPath + imgName;
  }
}
