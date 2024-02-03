import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LegalNoticesComponent } from './legal-notices/legal-notices.component';
import { MeComponent } from './me/me.component';
import { ChronotypeAnimalComponent } from './quizz/chronotype-annimal/chronotype-animal.component';
import { HorneOstbergComponent } from './quizz/horne-ostberg/horne-ostberg.component';
import { InsomniaSeverityIndexComponent } from './quizz/insomnia-severity-index/insomnia-severity-index.component';
import { SahosComponent } from './quizz/sahos/sahos.component';
import { UnsubcribeComponent } from './unsubcribe/unsubcribe.component';

export const routes: Routes = [
    {path: 'articles', component: ArticlesComponent},
    {path: 'articles/test-severite-insomnie', component: InsomniaSeverityIndexComponent},
    {path: 'articles/test-depistage-apnee-sommeil', component: SahosComponent},
    {path: 'articles/test-chronotype', component: HorneOstbergComponent},
    {path: 'articles/test-chronotype-animal', component: ChronotypeAnimalComponent},
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
    {path: '404',  loadComponent: () => import('./404/not-found-404.component') },
    {path: '**', redirectTo: '404', pathMatch: 'full'},
  ];
