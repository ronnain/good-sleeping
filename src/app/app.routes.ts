import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'articles', loadComponent: () => import('./articles/articles.component')},
    {path: 'articles/test-severite-insomnie', loadComponent: () => import('./quizz/insomnia-severity-index/insomnia-severity-index.component') },
    {path: 'articles/test-depistage-apnee-sommeil', loadComponent: () => import('./quizz/sahos/sahos.component')},
    {path: 'articles/test-chronotype', loadComponent: () => import('./quizz/horne-ostberg/horne-ostberg.component')},
    {path: 'articles/test-chronotype-animal', loadComponent: () => import('./quizz/chronotype-annimal/chronotype-animal.component')},
    {path: 'articles/:articleName', loadComponent: () => import('./article/article.component')},
    {path: 'a-propos', loadComponent: () => import('./me/me.component')},
    {path: 'bonus', loadComponent: () => import('./landing-page/landing-page.component')},
    {path: 'desabonnement/:key', loadComponent: () => import('./unsubcribe/unsubcribe.component')},
    {path: 'mentions', loadComponent: () => import('./legal-notices/legal-notices.component')},
    {path: 'contact', loadComponent: () => import('./contact/contact.component')},
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {path: '',  loadComponent: () => import('./home/home.component') },
    {path: '404',  loadComponent: () => import('./404/not-found-404.component') },
    {path: '**', redirectTo: '404', pathMatch: 'full'},
  ];
