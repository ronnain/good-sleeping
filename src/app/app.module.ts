import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormationsComponent } from './formations/formations.component';
import { ProductComponent } from './product/product.component';
import { RetrieveMailComponent } from './retrieve-mail/retrieve-mail.component';
import { FormsModule }   from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommentComponent } from './comment/comment.component';
import { UnsubcribeComponent } from './unsubcribe/unsubcribe.component';
import { FooterComponent } from './footer/footer.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { ContactComponent } from './contact/contact.component';
import { MeComponent } from './me/me.component';


const appRoutes: Routes = [
  {path: 'accueil', component: HomeComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'produits', component: ProductsComponent},
  {path: 'articles/:articleName', component: ArticleComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'a-propos', component: MeComponent},
  {path: 'bonus', component: LandingPageComponent},
  {path: 'desabonnement/:key', component: UnsubcribeComponent},
  {path: 'mentions', component: LegalNoticesComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: 'articles', pathMatch: 'full' },
  {path: '**', redirectTo: 'articles', pathMatch: 'full'},
  {path: 'not-found', redirectTo: 'articles', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticlesComponent,
    ProductsComponent,
    FormationsComponent,
    ProductComponent,
    RetrieveMailComponent,
    ArticleComponent,
    LoginComponent,
    LandingPageComponent,
    CommentComponent,
    UnsubcribeComponent,
    FooterComponent,
    LegalNoticesComponent,
    ContactComponent,
    MeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
