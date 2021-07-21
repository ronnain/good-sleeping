import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UrlService {

    skipCreation: boolean = false;

    constructor() {
        const QueryString = window.location.search;
        const urlParams = new URLSearchParams(QueryString);
        this.skipCreation = urlParams.has('skipCreation');
    }

}