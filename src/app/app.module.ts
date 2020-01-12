import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
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
import { MailOverviewComponent } from './mail-overview/mail-overview.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';


const appRoutes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Articles', component: ArticlesComponent},
  {path: 'Products', component: ProductsComponent},
  {path: 'Article/:articleName', component: ArticleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mail', component: MailOverviewComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'Articles', pathMatch: 'full' },
  {path: '**', redirectTo: 'Articles', pathMatch: 'full'},
  {path: 'not-found', redirectTo: 'Articles', pathMatch: 'full'}  
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
    MailOverviewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),    
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
