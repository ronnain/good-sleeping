import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MobileService {

    isMobile: boolean;

    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}