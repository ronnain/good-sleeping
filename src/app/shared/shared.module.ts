import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommentComponent } from './component/comment/comment.component';
import { AnimateThatDirective } from './directives/animation.directive';
import { InserteComponentDirective } from './directives/inserte-component.directive';
import { SwipeDirective } from './directives/swipe.directive';
import { SafeHtmlPipe } from './pipes/safeHtmlPipe';
import { Carousel3dComponent } from './retrieve-mail/popup/carousel3d/carousel3d.component';
import { EbookAddsComponent } from './retrieve-mail/popup/ebook-adds/ebook-adds.component';
import { EbookFormComponent } from './retrieve-mail/popup/ebook-form/ebook-form.component';
import { EbookPopupComponent } from './retrieve-mail/popup/ebook-popup/ebook-popup.component';
import { EmailFormComponent } from './retrieve-mail/email-form/email-form.component';
import { RetrieveMailComponent } from './retrieve-mail/retrieve-mail.component';
import { ProblemFormComponent } from './retrieve-mail/problem-form/problem-form.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        SwipeDirective,
        InserteComponentDirective,
        AnimateThatDirective,
        SafeHtmlPipe,
        RetrieveMailComponent,
        Carousel3dComponent,
        EbookAddsComponent,
        EbookFormComponent,
        EbookPopupComponent,
        EmailFormComponent,
        CommentComponent,
        ProblemFormComponent
    ],
    declarations: [
        SwipeDirective,
        InserteComponentDirective,
        AnimateThatDirective,
        SafeHtmlPipe,
        RetrieveMailComponent,
        Carousel3dComponent,
        EbookAddsComponent,
        EbookFormComponent,
        EbookPopupComponent,
        EmailFormComponent,
        CommentComponent,
        ProblemFormComponent

    ],
    providers: [],
})
export class SharedModule { }
