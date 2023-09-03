import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { APP_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { EbookPopupComponent } from './shared/retrieve-mail/popup/ebook-popup/ebook-popup.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HeaderComponent, FooterComponent, RouterModule, EbookPopupComponent
  ],
  providers: [
    provideClientHydration(),
    { provide: APP_ID,  useValue: 'serverApp' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
