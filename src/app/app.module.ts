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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { RetrieveMailComponent } from './retrieve-mail/retrieve-mail.component';

const appRoutes: Routes = [
  {path: 'Home', component: HomeComponent},
  {path: 'Articles', component: ArticlesComponent},
  {path: 'Products', component: ProductsComponent},
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
    RetrieveMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'blog-sommeil'),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
