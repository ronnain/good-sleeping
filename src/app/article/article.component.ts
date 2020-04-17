import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { Page, MyArticle, Article } from '../modeles/interfaces.type';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, Page {

  article: Article;

  articleName: string;
  articleContent: string = "Recherche en cours.";
  articleRetrieve: boolean = false;
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
    window.scrollTo(0, 0);
  }

  setTitle() {
    this.titleService.setTitle(this.article.title + " - Sommeil Profond");
  }

  handleMeta() {
    if (this.metaService.getTag('name=description')) {
      this.metaService.updateTag({ name: 'description', content: this.article.metaDesc }, `name='description'`);
    } else {
      this.metaService.addTag({ name:'description', content: this.article.metaDesc });
    }
  }

  setHead() {
    this.articlesService.getArticleByName(this.articleName).subscribe(
      data => {
        this.article = new MyArticle (data.id, data.title, data.metaDesc, data.description, data.datePublished, data.dateModified, data.img, data.imgTitle, data.articleName),
        this.setTitle(),
        this.handleMeta(),
        this.removeStructuredData(),
        this.createStructuredData(),
        error => console.error('Une erreure est survenue à la récupération des artciles !', error)
      });
  }

  removeStructuredData() {
    const structuredData = document.getElementById("structuredData");
    if(structuredData) {
      structuredData.remove();
    }
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
    const scriptStructuredData = document.createElement('script');
    scriptStructuredData.id = "structuredData";
    scriptStructuredData.type = "application/ld+json";
    scriptStructuredData.innerHTML = structuredData;

    const head = document.getElementsByTagName('head')[0];
    head.append(scriptStructuredData);
  }
}
