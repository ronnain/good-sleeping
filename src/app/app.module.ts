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
import { FormsModule }   from '@angular/forms';
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
import { ArticleTagComponent } from './admin/article-tag/article-tag.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MailHandlerComponent } from './admin/mail-handler/mail-handler.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';


const appRoutes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:articleName', component: ArticleComponent},
  {path: 'a-propos', component: MeComponent},
  {path: 'bonus', component: LandingPageComponent},
  {path: 'desabonnement/:key', component: UnsubcribeComponent},
  {path: 'mentions', component: LegalNoticesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', redirectTo: 'login', pathMatch: 'full'},
  {path: 'admin/newArticle', canActivate: [AuthGuard], component: ArticleTagComponent},
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
    ArticleTagComponent,
    MailHandlerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
