import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { Article, Page } from '../modeles/interfaces.type';
import { ArticlesService } from '../shared/services/articles.service';
import { HeaderService } from '../shared/services/header.service';
import { dropDownCategories } from '../shared/animations/dropdown.animation';
import { isPlatformBrowser, NgIf, NgFor, NgClass, DatePipe } from '@angular/common';
import { articleAnimation } from '../shared/animations/articles.animation';
import { CATEGORIES } from '../modeles/categories-list.type';
import { CategoriesService } from '../shared/services/categories.service';
import { Router, RouterLink } from '@angular/router';
import { Categories } from '../modeles/categories.dto';
import { CategoryNameEnum } from '../modeles/category.type';
import { ArticlesFromCategoryPipe } from './articles-from-category.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
    animations: [dropDownCategories, articleAnimation],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, MatIconModule, RouterLink, MatButtonModule, MatProgressBarModule, DatePipe, ArticlesFromCategoryPipe]
})
export default class ArticlesComponent implements OnInit, Page {

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

  categories: Categories[] = CATEGORIES;
  categoriesDropDown: boolean = false;
  categorySelected: number = 0;

  isDisplayOnArticlePage: boolean = false;

  isBrowser:boolean = false;
  bigScreen: boolean = false;
  bigScreenLimit = 777;

  constructor(
    private articlesService: ArticlesService,
    public headerService: HeaderService,
    @Inject(PLATFORM_ID) platformId: Object,
    private categoriesService: CategoriesService,
    private router: Router
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit() {
    // Main page, otherwise it is called inside article component
    this.isDisplayOnArticlePage = !!this.currentArticleName;
    if(!this.isDisplayOnArticlePage) {
      this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    }
    if(this.isBrowser){
      this.bigScreen = screen.width >= this.bigScreenLimit;
    }
    this.getArticles();
    this.articlesService.loadFromArticles = true;
  }

  getArticles() {
    this.failSave = false;
    this.loading = true;

    this.getCurrentCategorieSelected();

    //Display other articles
    if(this.isDisplayOnArticlePage){
      this.getOtherArticles();
    } else { //display all articles
      this.getAllArticles();
    }
  }

  loadArticle(articleName: string) {
    this.loadArticleEvent.emit(articleName);
  }

  ngOnChanges(changes: SimpleChanges) {
    // call from article component
    if (changes['currentArticleName'] && changes['currentArticleName'].previousValue) {
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

  onCategorySelected(indexSelected: number) {
    this.categorySelected = indexSelected;

    for (let index = 0; index < this.categories.length; index++) {
      const category = this.categories[index];
      category.active = indexSelected === index;

      if (category.active) {
        this.categoriesService.setSelectedCategory(category.categoryName);
      }
    }
    this.categoriesDropDown = false;

    if (this.isDisplayOnArticlePage) { // go to articles page
      this.router.navigateByUrl('/articles');
    }
  }

  onToggleDropDown() {
    this.categoriesDropDown = !this.categoriesDropDown;
  }

  onMoreArticles() {
    this.router.navigateByUrl('/articles');
  }

  private getCurrentCategorieSelected() {
    let categoryTodisplay = this.categoriesService.getLinkedArticlesCategory();

    if (categoryTodisplay === CategoryNameEnum.other) {
      categoryTodisplay = CategoryNameEnum.all;
    }

    for (let index = 0; index < this.categories.length; index++) {
      const category = this.categories[index];
      category.active = categoryTodisplay === category.categoryName;

      if (category.active) {
        this.categorySelected = index;
      }
    }
  }

  private getOtherArticles() {
    this.articlesService.getOtherArticles(this.currentArticleName, this.categoriesService.getLinkedArticlesCategory()).subscribe(
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

  private getAllArticles() {
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