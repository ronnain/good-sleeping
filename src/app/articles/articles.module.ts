import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { ArticlesFromCategoryPipe } from './articles-from-category.pipe';
import { ArticlesComponent } from './articles.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatButtonModule,
        RouterModule
    ],
    declarations: [
        ArticlesComponent,
        ArticlesFromCategoryPipe
    ],
    providers: [],
    exports: [
        ArticlesComponent
    ],
})
export class ArticlesModule { }
