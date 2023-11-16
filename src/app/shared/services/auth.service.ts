import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private isAuthSub: Subject<boolean> = new Subject();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private http: HttpClient,
    private router: Router) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  checkUserLogin(pseudo: string, password: string) {
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=login&pseudo=` + pseudo + `&password=` + password)
    .pipe(
      catchError(this.handleError)
    );
  }

  userLogout() {
    localStorage.removeItem("pseudoSP");
    localStorage.removeItem("tokenSP");
    localStorage.removeItem("tokenSPExpires");
    this.router.navigate(['/login']);
  }

  authentificationSuccess(pseudo, token) {
    // the cookie expire 2h after login
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + (1000 * 7200);
    now.setTime(expireTime);

    this.isAuthSub.next(true);

    localStorage.setItem("pseudoSP", pseudo);
    localStorage.setItem("tokenSP", token);
    localStorage.setItem("tokenSPExpires", now.toUTCString());
  }

  isAuth():boolean {
    if (!this.isBrowser) {
      return false;
    }
    const tokenExpiresDate = localStorage.getItem("tokenSPExpires");
    if (!tokenExpiresDate || new Date().getTime() >= new Date(tokenExpiresDate).getTime()) {
      this.isAuthSub.next(false);
      return false;
    }
    this.isAuthSub.next(true);
    return true;
  }

  getPseudo() {
    return localStorage.getItem("pseudoSP");
  }

  getToken() {
    return localStorage.getItem("tokenSP");
  }

  getAuthSub() {
    return this.isAuthSub;
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
