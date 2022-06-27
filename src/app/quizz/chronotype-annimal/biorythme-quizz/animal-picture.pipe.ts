import { Pipe, PipeTransform } from '@angular/core';
import { Biorythme } from '../biorythme.type';

@Pipe({
    name: 'annimalPicture'
})

export class AnimalPicturePipe implements PipeTransform {
    transform(score: number): string {
        if (score < 32) {
            return "assets/icons/bioryhtme-animals/lion.svg";
          }
          if (score < 47) {
            return "assets/icons/bioryhtme-animals/bear.svg";
          }

          return "assets/icons/bioryhtme-animals/wolf.svg";
    }
}