import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceLineBreaks',
    standalone: true
})
export class ReplaceLineBreaks implements PipeTransform {
transform(value: string): string {
      return value.replace(/\n/g, '<br/>');
   }
}