import { Injectable } from '@angular/core';
import { Article } from '../../modeles/interfaces.type';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { TransferStateService } from './transferState.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  loadFromArticles: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  pseudo: any;
  token: any;

  constructor(private http: HttpClient, private authService: AuthService, private transferStateService: TransferStateService) { }


  getArticleContent(articleName: string) {
    const url = environment.serverConfig.articlesPath + articleName + '.html';
    const options =  {responseType: 'text'};
    return this.transferStateService.getData(url, options, () => {
      return this.http.get(url, {responseType: 'text'})
        .pipe(
          catchError(this.handleError)
        );
    });
  }

  getAllArticles() {
    const url = environment.serverConfig.serverURL + `?method=getArticles`;
    return this.transferStateService.getData(url, null, () => {
      return this.http.get<Array<Article>>(url)
        .pipe(
          catchError(this.handleError)
        );
    });
  }

  getOtherArticles(articleName: string, category: string): Observable<Article[]>{
    const url = environment.serverConfig.serverURL + `?method=getOtherArticles&articleName=${articleName}&category=${category}` ;
    return this.transferStateService.getData(url, null, () => {
      return this.http.get<Article[]>(url)
        .pipe(
          catchError(this.handleError)
        );
    });
  }

  getArticleByName(articleName: string): Observable<Article> {
    const url = environment.serverConfig.serverURL + `?method=getArticleByName&articleName=` + articleName;
    console.log('getArticleByName url', url);
    return this.transferStateService.getData(url, null, () => {
      return this.http.get<Article>(url)
        .pipe(
          catchError(this.handleError)
        );
    });
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
    console.log('handleError error', error);
    if (error?.error instanceof ErrorEvent) {
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
    return of('Something bad happened; please try again later.');
  };
}
