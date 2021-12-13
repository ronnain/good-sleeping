import { Injectable } from '@angular/core';
import { RadioGroupComponent } from 'src/app/quizz/shared/radio-group/radio-group.component';

@Injectable({providedIn: 'root'})
export class ComponentFactoryService {

    
    COMPONENT_LIST = {
        'radio-group': RadioGroupComponent
    };

    constructor() { }

    getComponent(componentName: string) {
        return this.COMPONENT_LIST[componentName];
    }
}