import { Injectable } from '@angular/core';
import { Article } from '../modeles/interfaces.type';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  pseudo: any;
  token: any;

  constructor(private http: HttpClient, private authService: AuthService) { }


  getArticleContent(articleName: string) {
    return this.http.get(environment.serverConfig.articlesPath + articleName + '.html', {responseType: 'text'})
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllArticles() {
    return this.http.get<Array<Article>>(environment.serverConfig.serverURL + `?method=getArticles`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getOtherArticles(articleName: string){
    return this.http.get<Array<Article>>(environment.serverConfig.serverURL + `?method=getOtherArticles&articleName=` + articleName)
    .pipe(
      catchError(this.handleError)
    );
  }

  getArticleByName(articleName: string) {
    return this.http.get<Article>(environment.serverConfig.serverURL + `?method=getArticleByName&articleName=` + articleName)
      .pipe(
        catchError(this.handleError)
      );
  }

  addNewArticle(article: Article, articleText: string) {
    this.getIndentifiants();
    const body = {
      article,
      articleText,
      "pseudo": this.pseudo,
      "token": this.token
    };
    const url = environment.serverConfig.serverURL + '?method=addNewArticle';
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
