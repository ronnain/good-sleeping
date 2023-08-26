import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
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
        MatIconModule,
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
