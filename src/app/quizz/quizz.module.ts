import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { RadioGroupComponent } from './shared/radio-group/radio-group.component';
import { CardQuizzComponent } from './shared/card-quizz/card-quizz.component';
import { ArticlesModule } from '../articles/articles.module';
import { QuizzProblemFormComponent } from './shared/quizz-problem-form/quizz-problem-form.component';
import { ChronotypeAnimalComponent } from './chronotype-annimal/chronotype-animal.component';
import { DolphinQuizzComponent } from './chronotype-annimal/dolphin-quizz/dolphin-quizz.component';
import { BiorythmeQuizzComponent } from './chronotype-annimal/biorythme-quizz/biorythme-quizz.component';
import { IsAnswerSelectedPipe } from './shared/card-quizz/card-answer-selected.pipe';
import { AnimalPicturePipe } from './chronotype-annimal/biorythme-quizz/animal-picture.pipe';
import { AnnimalPipe } from './chronotype-annimal/biorythme-quizz/animal.pipe';


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
        SharedModule,
        ArticlesModule
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
        CardQuizzComponent,
        IsAnswerSelectedPipe,
        QuizzProblemFormComponent,
        ChronotypeAnimalComponent,
        DolphinQuizzComponent,
        BiorythmeQuizzComponent,
        AnimalPicturePipe,
        AnnimalPipe
    ],
    providers: [],
    exports: [
        SahosComponent,
        InsomniaSeverityIndexComponent
    ],
})
export class QuizzModule { }
