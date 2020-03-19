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
    this.refreshArticle();
  }

  refreshArticle() {
    console.log('refresh');
    this.articleName = this._Activatedroute.snapshot.paramMap.get("articleName");
    console.log('articleName', this.articleName);
    this.getArticle();
  }

  getArticle() {
    this.loading = true;
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
        this.loading = false;
        this.failSave = true;
      });;
  }
}
