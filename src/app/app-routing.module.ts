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
import { SahosComponent } from './quizz/sahos/sahos.component';
import { UnsubcribeComponent } from './unsubcribe/unsubcribe.component';

const routes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/test-severite-insomnie', component: InsomniaSeverityIndexComponent},
  {path: 'articles/test-depistage-apnee-sommeil', component: SahosComponent},
  {path: 'articles/:articleName', component: ArticleComponent},
  {path: 'a-propos', component: MeComponent},
  {path: 'bonus', component: LandingPageComponent},
  {path: 'desabonnement/:key', component: UnsubcribeComponent},
  {path: 'mentions', component: LegalNoticesComponent},
  {path: 'contact', component: ContactComponent},
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
