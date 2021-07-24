import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetrieveMailComponent } from './shared/retrieve-mail/retrieve-mail.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommentComponent } from './comment/comment.component';
import { UnsubcribeComponent } from './unsubcribe/unsubcribe.component';
import { FooterComponent } from './footer/footer.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { ContactComponent } from './contact/contact.component';
import { MeComponent } from './me/me.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SafeHtmlPipe } from './shared/pipes/safeHtmlPipe';
import { CookiesHandlerComponent } from './cookies-handler/cookies-handler.component';
import { EbookPopupComponent } from './shared/retrieve-mail/ebook-popup/ebook-popup.component';
import { Carousel3dComponent } from './shared/retrieve-mail/carousel3d/carousel3d.component';
import { EbookFormComponent } from './shared/retrieve-mail/ebook-form/ebook-form.component';
import { EbookAddsComponent } from './shared/retrieve-mail/ebook-adds/ebook-adds.component';
import { EmailFormComponent } from './shared/retrieve-mail/email-form/email-form.component';
import { SwipeDirective } from './shared/directives/swipe.directive';
import { AnimateThatDirective } from './shared/directives/animation.directive';
import { QuizzModule } from './quizz/quizz.module';
import { ShareBtnsModule } from './social-network-share-buttons/share-btns.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticlesComponent,
    RetrieveMailComponent,
    ArticleComponent,
    LandingPageComponent,
    CommentComponent,
    UnsubcribeComponent,
    FooterComponent,
    LegalNoticesComponent,
    ContactComponent,
    MeComponent,
    SafeHtmlPipe,
    SwipeDirective,
    AnimateThatDirective,
    CookiesHandlerComponent,
    EbookPopupComponent,
    Carousel3dComponent,
    EbookFormComponent,
    EbookAddsComponent,
    EmailFormComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserTransferStateModule,
    QuizzModule,
    ShareBtnsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
