import { Pipe, PipeTransform } from '@angular/core';
import { Biorythme } from '../biorythme.type';

@Pipe({
    name: 'animal'
})

export class AnnimalPipe implements PipeTransform {
    transform(score: number): string {
        if (score < 32) {
            return Biorythme.Lion;
          }
          if (score < 47) {
            return Biorythme.Bear;
          }

          return Biorythme.Wolf;
    }
}