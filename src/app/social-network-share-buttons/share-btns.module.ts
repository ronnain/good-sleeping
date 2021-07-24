import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { SocialNetworkShareButtonsComponent } from './social-network-share-buttons.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShareButtonsModule,
        ShareIconsModule,
    ],
    exports: [SocialNetworkShareButtonsComponent],
    declarations: [SocialNetworkShareButtonsComponent],
    providers: [],
})
export class ShareBtnsModule { }
