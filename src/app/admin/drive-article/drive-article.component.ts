import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgFor, NgIf, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CATEGORIES } from '../../modeles/categories-list.type';
import { Categories } from '../../modeles/categories.dto';
import { CategoryNameEnum } from '../../modeles/category.type';
import { MyArticle, ArticleConfig } from '../../modeles/interfaces.type';
import { DriveService } from '../../shared/services/drive.service';

@Component({
    selector: 'app-drive-article',
    templateUrl: './drive-article.component.html',
    styleUrls: ['./drive-article.component.css'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, FormsModule, NgFor, MatCheckboxModule, NgIf, MatButtonModule, MatProgressBarModule, JsonPipe]
})
export class DriveArticleComponent implements OnInit {
  articleName:string;
  article: MyArticle = new MyArticle(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  articleConfig: ArticleConfig = {id: undefined, idArticle: undefined, img: []};
  nbImg: number;
  articleCreation: boolean = true; // use for published a new article at a specific time
  subActivatedroute: Subscription;
  subDriveService: Subscription;

  defaultTitle: string;
  defaultMetaDescription: string;
  categories: Categories[] = JSON.parse(JSON.stringify(CATEGORIES));
  showValidation: boolean = false;
  imgListFail = [];

  failSave: boolean = false;
  failMsg: string;
  loading: boolean = false;

  constructor(private _Activatedroute:ActivatedRoute, private driveService: DriveService, private router: Router) { }

  ngOnInit(): void {
    this.initializeCategories();
    this.getArticleName();
    this.article.articleName = this.articleName;
    this.getArticleInformation();
  }

  getArticleName() {
    this.subActivatedroute = this._Activatedroute.url.subscribe(url =>{
      this.articleName = this._Activatedroute.snapshot.paramMap.get("articleName");
    });
  }

  getArticleInformation(){
    this.showValidation = false;
    this.imgListFail = [];
    this.failSave = false;
    this.loading = true;
    this.subDriveService = this.driveService.getArticleData(this.articleName).subscribe(
      data => {
        if (data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
        if (data.article) {
          data.article.categories = data.article.categories.split(',');
          this.article = data.article;
          this.defaultTitle = this.article.title;
          this.defaultMetaDescription = this.article.metaDesc;
          this.setCategories();
        }
        this.article.articleName = this.articleName;
        if (data.articleConfig) {
          this.articleConfig = data.articleConfig;
          this.imgListFail = data.articleConfig.img.filter(img=> !img.uploaded);
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

  sendArticle(updateTextOnly?: boolean){
    this.showValidation = false;
    this.imgListFail = [];
    this.failSave = false;
    this.loading = true;
    const metaDesc = this.article.metaDesc;
    const title = this.article.title;

    this.setArticleSelectedCategories();

    this.driveService.updateArticle(this.article, this.articleConfig, this.articleCreation, title, metaDesc, updateTextOnly).subscribe(
      data => {
        if (data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
        if (data === "fail to retrieve meta-description") {
          this.failMsg = "fail to retrieve meta-description";
        }
        if (data.fileCreation === true) {
          this.showValidation = true;
        } else {
          this.failSave = true;
        }
        if (!data.allImgUploaded && data.imgList) {
          this.imgListFail = data.imgList.filter(img=> !img.uploaded);
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
        this.failMsg = err;
      });
  }

  retryUploadImg() {
    this.showValidation = false;
    this.imgListFail = [];
    this.failSave = false;
    this.loading = true;
    this.driveService.retryUploadImg(this.articleName).subscribe(
      data => {
        if(data === "Token expiry") {
          this.router.navigate(['/admin']);
        }
        if (data.imgList) {
          this.imgListFail = data.imgList.filter(img=> !img.uploaded);
        }
        if (!this.imgListFail.length) {
          this.showValidation;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
        this.failMsg = err;
      });
  }

  refreshTitleAndMetaDesc() {
    this.article.title = this.defaultTitle;
    this.article.metaDesc = this.defaultMetaDescription;
  }

  setArticleSelectedCategories() {
    const selectedCategories = this.categories.filter(category => category.active).map(category => category.categoryName);
    this.article.categories = selectedCategories;

    if (!this.article.categories.length) {
      this.article.categories.push(CategoryNameEnum.other);
    }
  }

  private setCategories() {
    this.categories.forEach(category => {
      category.active = this.article.categories.includes(category.categoryName);
    });
  }

  private initializeCategories() {
    this.categories.shift();
  }

  ngOnDestroy() {
    this.subActivatedroute.unsubscribe();
  }
}
