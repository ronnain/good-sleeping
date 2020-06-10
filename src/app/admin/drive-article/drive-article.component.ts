import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriveService } from 'src/app/services/drive.service';
import { Article, ArticleConfig, MyArticle } from 'src/app/modeles/interfaces.type';

@Component({
  selector: 'app-drive-article',
  templateUrl: './drive-article.component.html',
  styleUrls: ['./drive-article.component.css']
})
export class DriveArticleComponent implements OnInit {
  articleName:string;
  article: MyArticle = new MyArticle(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.articleName);
  articleConfig: ArticleConfig = {id: undefined, idArticle: undefined, img: []};
  nbImg: number;
  articleCreation: boolean = true; // use for published a new article at a specific time
  subActivatedroute: Subscription;
  subDriveService: Subscription;

  showValidation: boolean = false;
  failSave: boolean = false;
  loading: boolean = false;

  constructor(private _Activatedroute:ActivatedRoute, private driveService: DriveService, private router: Router) { }

  ngOnInit(): void {
    this.getArticleName();
    this.getArticleInformation();
  }

  getArticleName() {
    this.subActivatedroute = this._Activatedroute.url.subscribe(url =>{
      this.articleName = this._Activatedroute.snapshot.paramMap.get("articleName");
    });
  }

  getArticleInformation(){
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.subDriveService = this.driveService.getArticleData(this.articleName).subscribe(
      data => {
        if(data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
        if(data.article){
          this.article = data.article;
        }
        this.article.articleName = this.articleName;
        if(data.articleConfig){
          this.articleConfig = data.articleConfig;
        }
        this.nbImg = data.nbImg;
        this.articleCreation = !this.article.title;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }

  copyDescToMetaDeasc() {
    this.article.metaDesc = this.article.description;
  }

  addImg(){
    if(!this.articleConfig.img) {
      this.articleConfig.img = [];
    }
    this.articleConfig.img.push({imgPath: undefined, title: undefined, linkCreator: undefined});
  }

  delImg(index: number) {
    if(!this.articleConfig.img) {
      return;
    }
    !this.articleConfig.img.splice(index, 1);
  }

  sendAuthorized(){
    if(this.article && this.article.title && this.article.img && this.article.imgTitle && this.articleName
      && this.article.description && this.article.metaDesc
      && this.articleConfig.img && this.articleConfig.img.length === this.nbImg){
        return true;
    }
    return false;
  }

  sendArticle(){
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;
    this.driveService.updateArticle(this.article, this.articleConfig, this.articleCreation).subscribe(
      data => {
        if(data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
        if(data.success === true) {
          this.showValidation = true;
        } else {
          this.failSave = true;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
  }
  ngOnDestroy() {
    this.subActivatedroute.unsubscribe();
  }
}
