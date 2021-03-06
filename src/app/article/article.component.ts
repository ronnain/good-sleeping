import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID, Renderer2  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { Page, MyArticle, Article } from '../modeles/interfaces.type';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, Page {
  isBrowser: boolean;
  article: Article;

  articleName: string;
  articleContent: string = "Recherche en cours.";
  articleRetrieve: boolean = false;
  failSave: boolean;
  loading: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private _Activatedroute:ActivatedRoute,
    private articlesService: ArticlesService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    private _router: Router,
    public headerService: HeaderService
    ) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

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
    this.articleRetrieve = false;

    this.articlesService.getArticleContent(this.articleName).subscribe(
      data => {
        if (data) {
          this.articleContent = data;
          this.articleRetrieve = true;
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
    if(this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  setHead() {
    this.articlesService.getArticleByName(this.articleName).subscribe(
      data => {
        if (!data) {
          this._router.navigate(['articles']);
          return;
        }
        this.article = new MyArticle (data.id, data.title, data.metaDesc, data.description, data.datePublished, data.dateModified, data.img, data.imgTitle, data.articleName);
        this.headerService.handleTitleAndMeta(this.article.title, this.article.metaDesc);
        this.createStructuredData();
      },
      error => console.error('Une erreure est survenue à la récupération des articles !', error)
      );
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
    const scriptStructuredData = this.renderer2.createElement('script');
    scriptStructuredData.id = "structuredData";
    scriptStructuredData.type = "application/ld+json";
    scriptStructuredData.innerHTML = structuredData;

    this.renderer2.appendChild(this._document.head, scriptStructuredData);
  }
}
