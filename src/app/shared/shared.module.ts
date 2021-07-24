import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AnimateThatDirective } from './directives/animation.directive';
import { SwipeDirective } from './directives/swipe.directive';
import { SafeHtmlPipe } from './pipes/safeHtmlPipe';
import { Carousel3dComponent } from './retrieve-mail/carousel3d/carousel3d.component';
import { EbookAddsComponent } from './retrieve-mail/ebook-adds/ebook-adds.component';
import { EbookFormComponent } from './retrieve-mail/ebook-form/ebook-form.component';
import { EbookPopupComponent } from './retrieve-mail/ebook-popup/ebook-popup.component';
import { EmailFormComponent } from './retrieve-mail/email-form/email-form.component';
import { RetrieveMailComponent } from './retrieve-mail/retrieve-mail.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        SwipeDirective,
        AnimateThatDirective,
        SafeHtmlPipe,
        RetrieveMailComponent,
        Carousel3dComponent,
        EbookAddsComponent,
        EbookFormComponent,
        EbookPopupComponent,
        EmailFormComponent,
    ],
    declarations: [
        SwipeDirective,
        AnimateThatDirective,
        SafeHtmlPipe,
        RetrieveMailComponent,
        Carousel3dComponent,
        EbookAddsComponent,
        EbookFormComponent,
        EbookPopupComponent,
        EmailFormComponent,

    ],
    providers: [],
})
export class SharedModule { }
