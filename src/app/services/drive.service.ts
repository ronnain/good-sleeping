import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  pseudo;
  token;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllFilesFromDrive() {
    this.getIndentifiants();
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=getAllFilesFromDrive&pseudo=${this.pseudo}&token=${this.token}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getArticleData(articleName:string) {
    this.getIndentifiants();
    return this.http.get<any>(environment.serverConfig.serverURL + `?method=getArticleDriveData&articleName=${articleName}&pseudo=${this.pseudo}&token=${this.token}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send online or update an article
   * @param article
   * @param articleConfig
   * @param articleCreation
   */
  updateArticle(article, articleConfig, articleCreation) {
    this.getIndentifiants();
    const body = {
      article,
      articleConfig,
      articleCreation,
      "pseudo": this.pseudo,
      "token": this.token
    };
    const url = environment.serverConfig.serverURL + '?method=updateArticle';
    return this.http.post<any>(url, body, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  getIndentifiants () {
    this.pseudo = this.authService.getPseudo();
    this.token = this.authService.getToken();
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
