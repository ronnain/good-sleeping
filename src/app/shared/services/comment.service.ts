import { Injectable } from '@angular/core';
import { Comment } from '../../modeles/interfaces.type';
import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TransferStateService } from './transferState.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  comments: Comment[] = [];

  constructor(
    private http: HttpClient,
    private transferStateService: TransferStateService) { }

  addComment(comment: Comment) {
    if (!comment) {
      return of(null);
    }
    const urlAddComment = environment.serverConfig.serverURL + `?method=addComment`;
    return this.http.post<any>(urlAddComment, comment, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommentsByArticle(idArticle: number): Observable<Comment[]> {
    const url = environment.serverConfig.serverURL + `?method=getComments&articleId=`+idArticle;
    return this.transferStateService.getData(url, null, () => {
      return this.http.get<Array<Comment>>(url)
        .pipe(
          catchError(this.handleError)
        );
    });
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
