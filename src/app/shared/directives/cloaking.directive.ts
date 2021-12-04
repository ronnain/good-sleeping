import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[tape]' })
export class CloakingDirective {

    constructor() { }

    @HostListener('click', ['$event']) onClick($event){
        console.info('clicked: ' + $event);
    }


}