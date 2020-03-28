import { Injectable } from '@angular/core';
import { Article } from '../modeles/interfaces.type';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  articles: Article[] = [
    {
      id: 1,
      title: "Comment avoir un sommeil réparateur ?",
      description: "Je vous explique comment faire pour avoir un sommeil réparateur et les mécanismes qui se cachent derrières.",
      metaDesc: "Méthode pour avoir un sommeil réparateur et explications d'un sommeil réparateur.",
      date: "26/03/2020",
      img: "assets/img/sommeil-reparateur.jpg",
      articleName: "comment-avoir-un-sommeil-réparateur"
    },
    {
      id: 2,
      title: "Changement d'heure été - 7 Astuces faciles pour ne pas la subir 1h de sommeil perdu",
      description: "7 Astuces faciles pour ne pas subir le changement d'heure d'été.",
      metaDesc: "7 Astuces faciles pour ne pas subir le changement d'heure d'été.",
      date: "28/03/2020",
      img: "assets/img/time-changed.jpg",
      articleName: "changement-heure-été-7-astuces"
    }
  ];

  constructor(private http: HttpClient) { }


  getArticleContent(articleName: string) {
    return this.http.get(environment.serverConfig.articlesPath + articleName + '.php', {responseType: 'text'})
    .pipe(
      catchError(this.handleError)
    );
  }

  getAllArticles(): Article[]{
    return this.articles;
  }

  getArticlesByNames(articlesName: string[]): Article[]{
    return this.articles.filter(article => articlesName.indexOf(article.articleName) === -1);
  }

  getOtherArticles(articleName: string): Article[]{
    return this.articles.filter(article => articleName.indexOf(article.articleName) === -1);
  }

  getArticleIdByName(articleName: string): number {
    return this.articles.filter(artcile =>
      artcile.articleName === articleName)[0].id;
  }

  getArticleByName(articleName: string): Article {
    return this.articles.filter(artcile =>
      artcile.articleName === articleName)[0];
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
