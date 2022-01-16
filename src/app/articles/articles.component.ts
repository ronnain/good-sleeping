import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { Article, Page } from '../modeles/interfaces.type';
import { ArticlesService } from '../shared/services/articles.service';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../shared/services/header.service';
import { Category } from './categories.dto';
import { dropDownCategories } from '../shared/animations/dropdown.animation';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [dropDownCategories]
})
export class ArticlesComponent implements OnInit, Page {

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

  categories: Category[] = [
    {
      category: 'all',
      text: 'Tous les articles',
      active: true
    },
    {
      category: 'quizz',
      text: 'Test ton sommeil',
    },
    {
      category: 'hygiène',
      text: 'Comment bien dormir',
    },
    {
      category: 'troubles',
      text: 'Troubles du sommeil',
    }
  ];
  categoriesDropDown: boolean = false;
  categorySelected: number = 0;

  isBrowser:boolean = false;
  bigScreen: boolean = false;
  bigScreenLimit = 777;

  constructor(
    private articlesService: ArticlesService,
    public headerService: HeaderService,
    @Inject(PLATFORM_ID) platformId: Object,
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit() {
    // Main page, otherwise it is called inside article component
    if(!this.currentArticleName) {
      this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    }
    if(this.isBrowser){
      this.bigScreen = screen.width >= this.bigScreenLimit;
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
          this.handleNewBadgeDisplay();
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
          this.handleNewBadgeDisplay();
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
    }
    this.categoriesDropDown = false;
  }

  onToggleDropDown() {
    this.categoriesDropDown = !this.categoriesDropDown;
  }
}