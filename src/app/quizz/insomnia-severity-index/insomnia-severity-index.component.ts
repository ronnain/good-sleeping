import { ViewportScroller, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommentComponent } from '../../shared/component/comment/comment.component';
import ArticlesComponent from '../../articles/articles.component';
import { QuizzProblemFormComponent } from '../shared/quizz-problem-form/quizz-problem-form.component';
import { SocialNetworkShareButtonsComponent } from '../../social-network-share-buttons/social-network-share-buttons.component';
import { MailStepperComponent } from '../shared/mail-stepper/mail-stepper.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { environment } from '../../../environments/environment';
import { CategoryNameKeys, CategoryNameEnum } from '../../modeles/category.type';
import { Page } from '../../modeles/interfaces.type';
import { GoogleAnalyticsService } from '../../shared/directives/google-analytics.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { HeaderService } from '../../shared/services/header.service';



@Component({
    selector: 'app-insomnia-severity-index',
    templateUrl: './insomnia-severity-index.component.html',
    styleUrls: ['./insomnia-severity-index.component.css'],
    standalone: true,
    imports: [NgFor, MatFormFieldModule, MatSelectModule, FormsModule, MailStepperComponent, NgIf, SocialNetworkShareButtonsComponent, QuizzProblemFormComponent, ArticlesComponent, CommentComponent]
})
export default class InsomniaSeverityIndexComponent implements OnInit, Page {

  title = "Test de sévérité des troubles de l’insomnie gratuit en ligne 2024";
  metaDesc = "Découvre si tu es insomniaque grâce à ce test rapide et gratuit, en ligne. Si tu es insomniaque, je te donne les meilleurs conseils pour t'en sortir.";
  sharedArticleImg = environment.serverConfig.imgPath + 'test-severite-insomnie/article/' + 'img1/xm.jpg';
  articleId = environment.quizz.insomniaSeverityId;
  articleName: string = 'test-severite-insomnie';
  articleCategories: CategoryNameKeys[] = [CategoryNameEnum.insomnie, CategoryNameEnum.quizz, CategoryNameEnum.troubles];


  TEST_INSOMNIE_CATEGORIE = "TEST_INSOMNIE";
  answerSelected = false;
  firstStepSelected = false;
  showResult = false;

  score: number = 0;

  constructor(
    private viewportScroller: ViewportScroller,
    public headerService: HeaderService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
    this.categoriesService.setCurrentArticleCategories(this.articleCategories);
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
    this.headerService.createOpenGraphMeta(this.title, this.metaDesc, this.sharedArticleImg);
  }

  scale1: any[] = [
    {value: 0, viewValue: 'Pas du tout'},
    {value: 1, viewValue: 'Un petit peu'},
    {value: 2, viewValue: 'Moyennement'},
    {value: 3, viewValue: 'Beaucoup'},
    {value: 4, viewValue: 'Extrêmement'}
  ];

  scale2: any[] = [
    {value: 0, viewValue: 'Très satisfait'},
    {value: 1, viewValue: 'Satisfait'},
    {value: 2, viewValue: 'Plutôt satisfait'},
    {value: 3, viewValue: 'Insatisfait'},
    {value: 4, viewValue: 'Très insatisfait'}
  ];

  quizz: any = [
    {
      title: "As-tu des difficultés pour t'endormir ?",
      questions: [
        {
          label: "Difficulté d'endormissement",
          scale: this.scale1
        }
      ]
  },
  {
    title: "Te réveilles-tu souvent et/ou régulièrement la nuit ?",
    questions: [
      {
        label: "Fréquence/durée réveils nocturnes",
        scale: this.scale1
      }
    ]
  },
  {
    title: "Estimes-tu que tu te réveilles trop tôt le matin ?",
    questions: [
      {
        label: "Réveil trop tôt",
        scale: this.scale1
      }
    ]
  },
  {
    title: "Es-tu satisfait(e) de ton sommeil ?",
    questions: [
      {
        label: "Satisfaction sommeil",
        scale: this.scale2
      }
    ]
  },
  {
    title: "À quel point tes difficultés de sommeil perturbent ton quotidien ? (fatigue, concentration, mémoire, humeur...)",
    questions: [
      {
        label: "Impact quotidien",
        scale: this.scale1
      }
    ]
  },
  {
    title: "À quel point considères-tu que tes difficultés de sommeil sont remarquées par les autres en terme de détérioration de ta qualité de vie ?",
    questions: [
      {
        label: "Impact qualité de vie",
        scale: this.scale1
      }
    ]
  },
  {
    title: "À quel point es-tu inquièt(e)/préoccupé(e) par tes problèmes de sommeil ?",
    questions: [
      {
        label: "Inquiétude problèmes de sommeil",
        scale: this.scale1
      }
    ]
  }
];

  getScore() {
    let total = 0;
    for (let step of this.quizz) {
      for (let question of step.questions) {
        if (question.answer) {
          total += question.answer;
        }
      }
    }

    this.score = total;

    if (this.showResult) {
      return;
    }

    this.googleAnalyticsService.sendEvent(
      "show_result",
      this.TEST_INSOMNIE_CATEGORIE,
      "show_result",
      "true"
    );
    this.showResult = true;
  }

  gotoAnchor(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onAnswerSelected() {
    if (this.answerSelected) {
      return;
    }
    this.googleAnalyticsService.sendEvent(
      "answer_selected",
      this.TEST_INSOMNIE_CATEGORIE,
      "answer_selected",
      "true"
      );
    this.answerSelected = true;
  }

  onNextStep() {
    if (this.firstStepSelected) {
      return;
    }

    this.googleAnalyticsService.sendEvent(
      "first_mail_step",
      this.TEST_INSOMNIE_CATEGORIE,
      "first_mail_step",
      "true"
      );
    this.firstStepSelected = true;
  }
}
