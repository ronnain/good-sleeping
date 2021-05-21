import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { MeComponent } from './me/me.component';
import { InsomniaSeverityIndexComponent } from './quizz/insomnia-severity-index/insomnia-severity-index.component';
import { UnsubcribeComponent } from './unsubcribe/unsubcribe.component';

const routes: Routes = [
  {path: 'articles', component: ArticlesComponent, data: {animation: 'Articles'}},
  {path: 'articles/test-severite-insomnie', component: InsomniaSeverityIndexComponent, data: {animation: 'Test'}},
  {path: 'articles/:articleName', component: ArticleComponent, data: {animation: 'Article'}},
  {path: 'a-propos', component: MeComponent, data: {animation: 'Me'}},
  {path: 'bonus', component: LandingPageComponent, data: {animation: 'Bonus'}},
  {path: 'desabonnement/:key', component: UnsubcribeComponent},
  {path: 'mentions', component: LegalNoticesComponent, data: {animation: 'Mentions'}},
  {path: 'contact', component: ContactComponent, data: {animation: 'Contact'}},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: '',  component: HomeComponent },
  {path: '**', redirectTo: 'articles', pathMatch: 'full'},
  {path: 'not-found', redirectTo: 'articles', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
