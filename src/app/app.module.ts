import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetrieveMailComponent } from './retrieve-mail/retrieve-mail.component';
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
import { InsomniaSeverityIndexComponent } from './quizz/insomnia-severity-index/insomnia-severity-index.component';
import { MailStepperComponent } from './quizz/shared/mail-stepper/mail-stepper.component';
import { SafeHtmlPipe } from './pipes/safeHtmlPipe';
import { CookiesHandlerComponent } from './cookies-handler/cookies-handler.component';
import { EbookPopupComponent } from './retrieve-mail/ebook-popup/ebook-popup.component';
import { Carousel3dComponent } from './retrieve-mail/ebook-popup/carousel3d/carousel3d.component';
import { EbookFormComponent } from './retrieve-mail/ebook-form/ebook-form.component';
import { EbookAddsComponent } from './retrieve-mail/ebook-adds/ebook-adds.component';


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
    InsomniaSeverityIndexComponent,
    MailStepperComponent,
    SafeHtmlPipe,
    CookiesHandlerComponent,
    EbookPopupComponent,
    Carousel3dComponent,
    EbookFormComponent,
    EbookAddsComponent
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
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
