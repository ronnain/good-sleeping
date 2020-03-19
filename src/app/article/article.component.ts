import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  articleName: string;
  articleContent: string = "Recherche en cours.";
  showValidation: boolean = false;
  failSave: boolean;
  loading: boolean;

  constructor(private _Activatedroute:ActivatedRoute, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle(articleName?: any) {
    this.articleName = articleName? articleName : this._Activatedroute.snapshot.paramMap.get("articleName");
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
}
