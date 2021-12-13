import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
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
import { HorneOstbergComponent } from './horne-ostberg/horne-ostberg.component';
import { MatRadioModule } from '@angular/material/radio';
import { RadioGroupComponent } from './shared/radio-group/radio-group.component';
import { CardQuizzComponent } from './shared/card-quizz/card-quizz.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        DragDropModule,
        MatProgressBarModule,
        MatStepperModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        ReactiveFormsModule,
        ShareBtnsModule,
        MatSelectModule,
        SharedModule
    ],
    declarations: [
        InsomniaSeverityIndexComponent,
        SahosComponent,
        RadioGroupComponent,
        BinaryActionsComponent,
        BinaryQuizzComponent,
        BmiCalculatorComponent,
        progressRatioPipe,
        MailStepperComponent,
        HorneOstbergComponent,
        CardQuizzComponent
    ],
    providers: [],
    exports: [
        SahosComponent,
        InsomniaSeverityIndexComponent
    ],
})
export class QuizzModule { }
