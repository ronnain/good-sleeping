import { Pipe, PipeTransform } from '@angular/core';
import { Biorythme } from '../biorythme.type';

@Pipe({
    name: 'annimalPicture'
})

export class AnnimalPicturePipe implements PipeTransform {
    transform(score: number): string {
        if (score < 32) {
            return "assets/icons/bioryhtme-annimals/lion.svg";
          }
          if (score < 47) {
            return "assets/icons/bioryhtme-annimals/bear.svg";
          }

          return "assets/icons/bioryhtme-annimals/wolf.svg";
    }
}