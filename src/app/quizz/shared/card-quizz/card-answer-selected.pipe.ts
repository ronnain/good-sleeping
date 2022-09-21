import { Pipe, PipeTransform } from '@angular/core';
import { CardQuestionDTO } from './card-question.dto';

@Pipe({
    name: 'isAnswerSelected'
})

export class IsAnswerSelectedPipe implements PipeTransform {
    transform(answerValue: number): boolean {
        return typeof answerValue === 'number';
    }
}