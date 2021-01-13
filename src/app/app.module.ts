import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetrieveMailComponent } from './retrieve-mail/retrieve-mail.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './admin/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommentComponent } from './comment/comment.component';
import { UnsubcribeComponent } from './unsubcribe/unsubcribe.component';
import { FooterComponent } from './footer/footer.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { ContactComponent } from './contact/contact.component';
import { MeComponent } from './me/me.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MailHandlerComponent } from './admin/mail-handler/mail-handler.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AddArticleComponent } from './admin/add-article/add-article.component';
import { DriveOverviewComponent } from './admin/drive-overview/drive-overview.component';
import { DriveArticleComponent } from './admin/drive-article/drive-article.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InsomniaSeverityIndexComponent } from './quizz/insomnia-severity-index/insomnia-severity-index.component';
import { MailStepperComponent } from './quizz/shared/mail-stepper/mail-stepper.component';


const appRoutes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/test-severite-insomnie', component: InsomniaSeverityIndexComponent},
  {path: 'articles/:articleName', component: ArticleComponent},
  {path: 'a-propos', component: MeComponent},
  {path: 'bonus', component: LandingPageComponent},
  {path: 'desabonnement/:key', component: UnsubcribeComponent},
  {path: 'mentions', component: LegalNoticesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: LoginComponent},
  {path: 'admin/newArticle', canActivate: [AuthGuard], component: AddArticleComponent},
  {path: 'admin/driveOverview', canActivate: [AuthGuard], component: DriveOverviewComponent},
  {path: 'admin/driveOverview/:articleName', canActivate: [AuthGuard], component: DriveArticleComponent},
  {path: 'admin/mail', canActivate: [AuthGuard], component: MailHandlerComponent},
  {path: '',  component: HomeComponent },
  {path: '**', redirectTo: 'articles', pathMatch: 'full'},
  {path: 'not-found', redirectTo: 'articles', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticlesComponent,
    RetrieveMailComponent,
    ArticleComponent,
    LoginComponent,
    LandingPageComponent,
    CommentComponent,
    UnsubcribeComponent,
    FooterComponent,
    LegalNoticesComponent,
    ContactComponent,
    MeComponent,
    MailHandlerComponent,
    AdminComponent,
    AddArticleComponent,
    DriveOverviewComponent,
    DriveArticleComponent,
    InsomniaSeverityIndexComponent,
    MailStepperComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
