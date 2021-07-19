import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'progressRatio'})
export class progressRatioPipe implements PipeTransform {
transform(index: number, total: number): number {
      return ((index+1)/total) * 100;
   }
}