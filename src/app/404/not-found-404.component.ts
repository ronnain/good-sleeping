import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RESPONSE } from '../response';

@Component({
    standalone: true,
    imports: [
    CommonModule
    ],
    styleUrls: ['./not-found-404.component.scss'],
    template: `
<h1>Oups !!! Page Introuvable !</h1>
    `
})
export default class NotFound404Component {
    private readonly RESPONSE = inject(RESPONSE, {optional: true});

    constructor() {
        this.RESPONSE?.status(404);
    }

}