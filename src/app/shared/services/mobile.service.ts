import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { USER_AGENT } from '../../user-agent';

@Injectable({providedIn: 'root'})
export class MobileService {

    isMobile: boolean;

    constructor(
        @Inject(PLATFORM_ID) platformId: Object,
        @Optional() @Inject(USER_AGENT) private userAgentToken: string
    ) {

        const userAgent = isPlatformBrowser(platformId) ? navigator.userAgent : this.userAgentToken;

        this.isMobile = /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }
}