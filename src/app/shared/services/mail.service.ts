import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  pseudo;
  token;

  userMail: string;

  $isMailSotred: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $isProblemSotred: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private urlService: UrlService
    ) {}

  storeContact(firstName: string, mail: string): Observable<boolean> {
    return new Observable(observer => {
      this.createContact(firstName, mail.toLowerCase()).subscribe(
        data => {
          if(data['success'] === true) {
            this.urlService.setSkipCreation(true);
            this.$isMailSotred.next(true);
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        err => {
          observer.error(err);
          observer.complete();
        });
    });
  }

  createContact(firstName: string, mail: string) {
    if (this.urlService.skipCreation) {
      return of(true);
    }

    this.userMail = mail;

    const body = {
      "firstName" : this.capitalizeFirstLetter(firstName),
      "mail": mail,
      "referer": window.location.pathname
    };
    const url = environment.serverConfig.serverURL + '?method=createContact';
    return this.http.post<any>(url, body, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  storeContactProblem(message: string) {
    const body = {
      message,
      "mail": this.userMail
    };
    const url = environment.serverConfig.serverURL + '?method=storeContactProblem';
    return this.http.post<string>(url, body, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendMailToAll(objectMail, bodyMail) {
    this.getIndentifiants();
    const body = {
      "object" : objectMail,
      "body": bodyMail,
      "pseudo": this.pseudo,
      "token": this.token
    };
    const url = environment.serverConfig.serverURL + '?method=mailToAll';
    return this.http.post<any>(url, body, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllContacts() {
    this.getIndentifiants();
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=getAllMails&pseudo=${this.pseudo}&token=${this.token}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  unsubscribe(unsubscribeKey) {
    const body = {
      "key" : unsubscribeKey
    };
    const url = environment.serverConfig.serverURL + '?method=unsubscribe';
    return this.http.post<any>(url, body, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getIndentifiants () {
    this.pseudo = this.authService.getPseudo();
    this.token = this.authService.getToken();
  }

  private capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
