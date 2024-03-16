import { Component, OnInit } from '@angular/core';
import { binaryQuestionDTO } from '../shared/binary-quizz/binary-question.dto';
import { QUIZZ_NO_SAS, QUIZZ_STOP_BANG } from './sahos.questions.dto';
import { CommentComponent } from '../../shared/component/comment/comment.component';
import ArticlesComponent from '../../articles/articles.component';
import { QuizzProblemFormComponent } from '../shared/quizz-problem-form/quizz-problem-form.component';
import { SocialNetworkShareButtonsComponent } from '../../social-network-share-buttons/social-network-share-buttons.component';
import { NgIf } from '@angular/common';
import { MailStepperComponent } from '../shared/mail-stepper/mail-stepper.component';
import { BmiCalculatorComponent } from '../shared/bmi-calculator/bmi-calculator.component';
import { BinaryQuizzComponent } from '../shared/binary-quizz/binary-quizz.component';
import { environment } from '../../../environments/environment';
import { CategoryNameKeys, CategoryNameEnum } from '../../modeles/category.type';
import { Page } from '../../modeles/interfaces.type';
import { CategoriesService } from '../../shared/services/categories.service';
import { HeaderService } from '../../shared/services/header.service';

@Component({
    selector: 'app-sahos',
    templateUrl: './sahos.component.html',
    styleUrls: ['./sahos.component.css'],
    standalone: true,
    imports: [BinaryQuizzComponent, BmiCalculatorComponent, MailStepperComponent, NgIf, SocialNetworkShareButtonsComponent, QuizzProblemFormComponent, ArticlesComponent, CommentComponent]
})
export default class SahosComponent implements OnInit, Page {

  title = "Test de dépistage d’apnée du sommeil en 13 questions en 2024";
  metaDesc = "Réponds rapidement à ces 14 questions pour connaître ton risque de faire des apnées du sommeil.";
  sharedArticleImg = environment.serverConfig.imgPath + 'test-depistage-apnee-sommeil/article/' + 'img1/xm.jpg';
  articleId = environment.quizz.sahosId;
  articleName: string = 'test-depistage-apnee-sommeil';
  articleCategories: CategoryNameKeys[] = [CategoryNameEnum.apnee, CategoryNameEnum.quizz, CategoryNameEnum.troubles];

  noSasScore:number = 0;
  stopBangScore: number = 0;
  riskNoSas: string;
  riskStopBang: string;

  quizzNoSAS: binaryQuestionDTO[] = JSON.parse(JSON.stringify(QUIZZ_NO_SAS));

  quizzStopBang: binaryQuestionDTO[] = JSON.parse(JSON.stringify(QUIZZ_STOP_BANG));

  quizz: binaryQuestionDTO[] = [...this.quizzNoSAS, ...this.quizzStopBang];

  quizzNoSASNotCompleted: boolean = false;
  quizzStopBangNotCompleted: boolean = false;

  restartValue: number;

  constructor(
    public headerService: HeaderService,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
    this.categoriesService.setCurrentArticleCategories(this.articleCategories);
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    this.headerService.createOpenGraphMeta(this.title, this.metaDesc, this.sharedArticleImg);
  }

  onGetScore() {
    this.noSasScore = 0;
    this.stopBangScore = 0;
    this.quizzNoSASNotCompleted = false;
    this.quizzStopBangNotCompleted = false;

    for (const question of this.quizzNoSAS) {
      if (! ('answer' in question)) {
        this.quizzNoSASNotCompleted = true;
        return;
      }

      this.noSasScore += question.answer ? question.value : 0;
    }

    for (const question of this.quizzStopBang) {

      if (! ('answer' in question)) {
        this.quizzStopBangNotCompleted = true;
        return;
      }

      this.stopBangScore += question.answer ? question.value : 0;
    }

    this.getRisk();
  }

  getRisk() {

    this.riskNoSas = this.noSasScore > 7 ? "Elevé" : "Faible";

    if (this.stopBangScore <= 2) {
      this.riskStopBang = "Faible";
      return;
    }
    if (this.stopBangScore <=3) {
      this.riskStopBang = "Modéré";
      return;
    }
    this.riskStopBang = "Elevé";
  }

  onReset() {
    this.quizzNoSAS = JSON.parse(JSON.stringify(QUIZZ_NO_SAS));
    this.quizzStopBang = JSON.parse(JSON.stringify(QUIZZ_STOP_BANG));
    this.quizz = [...this.quizzNoSAS, ...this.quizzStopBang];
    this.noSasScore = 0;
    this.stopBangScore = 0;
    this.quizzNoSASNotCompleted = true;
    this.quizzStopBangNotCompleted = true;
    this.restartValue = Date.now();
  }

}
