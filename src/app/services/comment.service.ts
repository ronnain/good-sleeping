import { Injectable } from '@angular/core';
import { Comment } from '../modeles/interfaces.type';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  addComment(comment: Comment) {
    if (!comment) {
      return;
    }
    const urlAddComment = environment.serverConfig.serverURL + `?method=addComment`;
    return this.http.post<number>(urlAddComment, { comment, method: 'addComment' });
  }

  getCommentsByArticle(idArticle: number): Observable<Comment[]> {
    return this.http.get<Array<Comment>>(environment.serverConfig.serverURL + `?method=getComments&articleId=`+idArticle);
  }
}
