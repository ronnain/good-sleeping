import { Component, OnInit } from '@angular/core';
import { CategoryNameEnum, CategoryNameKeys } from 'src/app/modeles/category.type';
import { Page } from 'src/app/modeles/interfaces.type';
import { GoogleAnalyticsService } from 'src/app/shared/directives/google-analytics.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { environment } from 'src/environments/environment';
import { BiorythmeScore } from './biorythme.type';

@Component({
  selector: 'app-chronotype-annimal',
  templateUrl: './chronotype-annimal.component.html',
  styleUrls: ['./chronotype-annimal.component.scss']
})
export class ChronotypeAnnimalComponent implements OnInit, Page {

  title = "Test chronotype animal";
  metaDesc = "Quizz pour connaître son chronotype animal. Es-tu un lion, un ours, un loup ou un dauphin ?";
  sharedArticleImg = environment.serverConfig.imgPath + 'test-chronotype-animal/article/' + 'img1/xm.jpg';

  articleId = environment.quizz.sahosId; // todo change that !
  articleName: string = 'test-chronotype-animal';
  articleCategories: CategoryNameKeys[] = [CategoryNameEnum.quizz];

  testIndex: number = 0;

  TEST_CHRONOTYPE__ANNIMAL_CATEGORIE = "TEST_CHRONOTYPE_ANNIMAL";
  BOOK_URL =  "https://www.amazon.fr/Quand-Michael-BREUS/dp/2714474764/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3GBCXYGGA3U0X&keywords=Quand%3F&qid=1655466246&sprefix=quand+%2Caps%2C442&sr=8-1";


  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    public headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    this.headerService.createOpenGraphMeta(this.title, this.metaDesc, this.sharedArticleImg);
  }

  onQuizzComplet(biorythmeScore: BiorythmeScore) {
    console.log('biorythmeScore', biorythmeScore);
  }

  onNextTest() {
    this.testIndex++;
  }

  onGoToBook() {
    console.log('onGoToBook');
    this.googleAnalyticsService.sendEvent(
      "goto_quand_book",
      this.TEST_CHRONOTYPE__ANNIMAL_CATEGORIE,
      "goto_quand_book",
      "true"
    );

    window.open(this.BOOK_URL, '_blank');
  }

}
