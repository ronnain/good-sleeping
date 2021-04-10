import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { DriveArticleComponent } from './drive-article/drive-article.component';
import { DriveOverviewComponent } from './drive-overview/drive-overview.component';
import { LoginComponent } from './login/login.component';
import { MailHandlerComponent } from './mail-handler/mail-handler.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ReplaceLineBreaks } from './pipes/replaceLinesBreaks';

@NgModule({
  declarations: [
    AdminComponent,
    AddArticleComponent,
    DriveArticleComponent,
    DriveOverviewComponent,
    LoginComponent,
    MailHandlerComponent,
    ReplaceLineBreaks
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
