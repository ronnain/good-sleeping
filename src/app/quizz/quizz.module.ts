import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared.module';
import { ShareBtnsModule } from '../social-network-share-buttons/share-btns.module';
import { InsomniaSeverityIndexComponent } from './insomnia-severity-index/insomnia-severity-index.component';
import { SahosComponent } from './sahos/sahos.component';
import { BinaryActionsComponent } from './shared/binary-quizz/binary-actions/binary-actions.component';
import { BinaryQuizzComponent } from './shared/binary-quizz/binary-quizz.component';
import { BmiCalculatorComponent } from './shared/bmi-calculator/bmi-calculator.component';
import { MailStepperComponent } from './shared/mail-stepper/mail-stepper.component';
import { progressRatioPipe } from './shared/pipes/progress-ratio';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        MatProgressBarModule,
        MatStepperModule,
        MatIconModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatButtonModule,
        ReactiveFormsModule,
        ShareBtnsModule,
        SharedModule
    ],
    exports: [
        SahosComponent,
        InsomniaSeverityIndexComponent
    ],
    declarations: [
        InsomniaSeverityIndexComponent,
        SahosComponent,
        BinaryActionsComponent,
        BinaryQuizzComponent,
        BmiCalculatorComponent,
        progressRatioPipe,
        MailStepperComponent
    ],
    providers: [],
})
export class QuizzModule { }
