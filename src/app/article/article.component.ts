import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../shared/services/articles.service';
import { Page, MyArticle, Article } from '../modeles/interfaces.type';
import { isPlatformBrowser, NgIf, DatePipe } from '@angular/common';
import { HeaderService } from '../shared/services/header.service';
import { CategoriesService } from '../shared/services/categories.service';
import { SafeHtmlPipe } from '../shared/pipes/safeHtmlPipe';
import { ArticlesComponent } from '../articles/articles.component';
import { CommentComponent } from '../shared/component/comment/comment.component';
import { RetrieveMailComponent } from '../shared/retrieve-mail/retrieve-mail.component';
import { SocialNetworkShareButtonsComponent } from '../social-network-share-buttons/social-network-share-buttons.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { environment } from '../../environments/environment';
import { EMPTY, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, MatProgressBarModule, SocialNetworkShareButtonsComponent, RetrieveMailComponent, CommentComponent, ArticlesComponent, DatePipe, SafeHtmlPipe]
})
export class ArticleComponent implements OnInit, Page {
  isBrowser: boolean;
  article: Article;

  articleName: string;
  articleContent: string = "Recherche en cours.";
  articleRetrieve: boolean = false;
  failSave: boolean;
  loading: boolean;

  isLoadedFromArticle: boolean = false;

  articleUrl: string;
  sharedArticleImg: string;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private _Activatedroute:ActivatedRoute,
    private articlesService: ArticlesService,
    private _router: Router,
    public headerService: HeaderService,
    private categoriesService: CategoriesService
    ) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle(articleName?: string) {
    this.articleName = articleName? articleName : this._Activatedroute.snapshot.paramMap.get("articleName");
    this.setHead();
    this.getArticle();
  }

  getArticle() {
    this.loading = true;
    this.failSave = false;
    this.articleRetrieve = false;

    this.articlesService.getArticleContent(this.articleName).subscribe({
      next: data => {
        if (data) {
          this.articleContent = data;
          this.articleRetrieve = true;
        } else {
          this.failSave = true;
        }
        this.loading = false;
      },
      error: err => {
        this.articleContent = null;
        this.loading = false;
        this.failSave = true;
        this.scrollToTop();
      },
      complete: () => {
        this.scrollToTop();
      }});
  }

  scrollToTop() {
    if(this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  setHead() {
    this.articlesService.getArticleByName(this.articleName).pipe(
      switchMap(data => {
        if(!data) {
          this._router.navigateByUrl('404');
          return EMPTY;
        }

        return of(data);
      })
    ).subscribe({
      next: data => {
        this.article = new MyArticle (data.id, data.title, data.metaDesc, data.description, data.datePublished, data.dateModified, data.img, data.imgTitle, data.articleName, data.categories, data.author);
        if (!this.articlesService.loadFromArticles) {
          this.categoriesService.setCurrentArticleCategories(this.article.categories);
        }
        this.headerService.handleTitleAndMeta(this.article.title, this.article.metaDesc);
        this.createStructuredData();
        this.sharedArticleImg = environment.serverConfig.imgPath + this.articleName + 'img1/xm.jpg';
        this.headerService.createOpenGraphMeta(this.article.title, this.article.description, this.sharedArticleImg)
      },
      error: error => console.error('Une erreur est survenue à la récupération des articles !', error)
      });
  }

  createStructuredData() {
    // Use of literal expression
    const structuredData = `{
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://sommeilprofond.fr/articles/${this.article.articleName}"
      },
      "headline": "${this.article.title}",
      "image": [
        "https://sommeilprofond.fr/sleeping-bs/img/${this.article.img}/structuredData/11.jpg",
        "https://sommeilprofond.fr/sleeping-bs/img/${this.article.img}/structuredData/43.jpg",
        "https://sommeilprofond.fr/sleeping-bs/img/${this.article.img}/structuredData/169.jpg"
       ],
      "datePublished": "${this.article.datePublished.replace(' ', 'T')}",
      "dateModified": "${this.article.dateModified.replace(' ', 'T')}",
      "author": {
        "@type": "Person",
        "name": "Romain"
      },
       "publisher": {
        "@type": "Organization",
        "name": "Sommeil Profond",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sommeilprofond.fr/assets/logo/favicon.png"
        }
      },
      "description": "${this.article.description}"
    }`;
    this.headerService.createStructuredData(structuredData);
  }

  onLoadArticle(articleName?: string) {
    this.articlesService.loadFromArticles = !!articleName;
    this.loadArticle(articleName);
  }
}
