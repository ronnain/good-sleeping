import { Component, OnInit } from '@angular/core';
import { BiorythmeScore } from './biorythme.type';
import { CommentComponent } from '../../shared/component/comment/comment.component';
import { ArticlesComponent } from '../../articles/articles.component';
import { BiorythmeQuizzComponent } from './biorythme-quizz/biorythme-quizz.component';
import { DolphinQuizzComponent } from './dolphin-quizz/dolphin-quizz.component';
import { NgIf } from '@angular/common';
import { environment } from '../../../environments/environment';
import { CategoryNameKeys, CategoryNameEnum } from '../../modeles/category.type';
import { Page } from '../../modeles/interfaces.type';
import { GoogleAnalyticsService } from '../../shared/directives/google-analytics.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { HeaderService } from '../../shared/services/header.service';

@Component({
    selector: 'app-chronotype-animal',
    templateUrl: './chronotype-animal.component.html',
    styleUrls: ['./chronotype-animal.component.scss'],
    standalone: true,
    imports: [NgIf, DolphinQuizzComponent, BiorythmeQuizzComponent, ArticlesComponent, CommentComponent]
})
export class ChronotypeAnimalComponent implements OnInit, Page {

  title = "Test chronotype animal";
  metaDesc = "Quizz pour connaître son chronotype animal. Es-tu un lion, un ours, un loup ou un dauphin ?";
  sharedArticleImg = environment.serverConfig.imgPath + 'test-chronotype-animal/article/' + 'img1/xm.jpg';

  articleId = environment.quizz.chronotypeAnimal;
  articleName: string = 'test-chronotype-animal';
  articleCategories: CategoryNameKeys[] = [CategoryNameEnum.quizz];

  testIndex: number = 0;

  TEST_CHRONOTYPE__ANIMAL_CATEGORIE = "TEST_CHRONOTYPE_ANIMAL";
  BOOK_URL =  "https://www.amazon.fr/Quand-Michael-BREUS/dp/2714474764/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3GBCXYGGA3U0X&keywords=Quand%3F&qid=1655466246&sprefix=quand+%2Caps%2C442&sr=8-1";


  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    public headerService: HeaderService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.setCurrentArticleCategories(this.articleCategories);
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    this.headerService.createOpenGraphMeta(this.title, this.metaDesc, this.sharedArticleImg);
  }

  onQuizzComplet(biorythmeScore: BiorythmeScore) {
  }

  onNextTest() {
    this.testIndex++;
  }

  onGoToBook() {
    this.googleAnalyticsService.sendEvent(
      "goto_quand_book",
      this.TEST_CHRONOTYPE__ANIMAL_CATEGORIE,
      "goto_quand_book",
      "true"
    );

    window.open(this.BOOK_URL, '_blank');
  }

}
