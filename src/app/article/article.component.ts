import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { Page } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, Page {

  metaDesc;
  title;

  articleName: string;
  articleContent: string = "Recherche en cours.";
  showValidation: boolean = false;
  failSave: boolean;
  loading: boolean;

  constructor(private _Activatedroute:ActivatedRoute, private articlesService: ArticlesService, private titleService:Title, private metaService:Meta) { }

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle(articleName?: any) {
    this.articleName = articleName? articleName : this._Activatedroute.snapshot.paramMap.get("articleName");
    this.setHead();
    this.getArticle();
  }

  getArticle() {
    this.loading = true;
    this.failSave = false;

    this.articlesService.getArticleContent(this.articleName).subscribe(
      data => {
        if (data) {
          this.articleContent = data;
        } else {
          this.failSave = true;
        }
        this.loading = false;
      },
      err => {
        this.articleContent = null;
        this.loading = false;
        this.failSave = true;
        this.scrollToTop();
      },
      () => {
        this.scrollToTop();
      });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  setTitle() {
    this.titleService.setTitle("Sommeil Profond - " + this.title);
  }

  handleMeta() {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: this.metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: this.metaDesc });
    }
  }

  setHead() {
    const article = this.articlesService.getArticleByName(this.articleName);
    this.title = article.title;
    this.metaDesc = article.metaDesc;

    this.setTitle();
    this.handleMeta();
  }
}
