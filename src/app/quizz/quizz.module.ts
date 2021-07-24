import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
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
        MaterialModule,
        ReactiveFormsModule,
        ShareBtnsModule
    ],
    exports: [
        SahosComponent,
        InsomniaSeverityIndexComponent],
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
