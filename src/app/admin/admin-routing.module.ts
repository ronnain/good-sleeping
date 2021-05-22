import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { AdminComponent } from './admin.component';
import { DriveArticleComponent } from './drive-article/drive-article.component';
import { DriveOverviewComponent } from './drive-overview/drive-overview.component';
import { LoginComponent } from './login/login.component';
import { MailHandlerComponent } from './mail-handler/mail-handler.component';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'newArticle',
        canActivate: [AuthGuard],
        component: AddArticleComponent
      },
      {
        path: 'driveOverview',
        canActivate: [AuthGuard],
        component: DriveOverviewComponent
      },
      {
        path: 'driveOverview/:articleName',
        canActivate: [AuthGuard],
        component: DriveArticleComponent
      },
      {
        path: 'mail',
        canActivate: [AuthGuard],
        component: MailHandlerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
