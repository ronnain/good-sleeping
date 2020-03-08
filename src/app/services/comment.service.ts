import { Injectable } from '@angular/core';
import { Comment } from '../modeles/interfaces.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comment: Comment = {
    id: 1,
    author: 'MichMich',
    date: new Date(),
    comment: 'réponse edzfzejzekjfezkjezfk efzkijfezkjfezknnfeznfeznjefzjfeznjfejzef fezjiefzlezfklnklezfnkfez    rdrd fezkfnekzlfkelznfezlknezf'
  }

  comments: Comment[] = [
    {
      id: 0,
      author: 'Romain',
      date: new Date(),
      comment: 'Test de commentaires',
      repliesComment: [
        this.comment,
        this.comment
      ]
    },
    {
      id: 0,
      author: 'Romain',
      date: new Date(),
      comment: 'Test de commentaires',
      repliesComment: [
        this.comment,
        this.comment
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  addComment(articleId: number, newComment: Comment, mainCommentIdRelied?: number): boolean {
    if (!articleId || !newComment) {
      return false;
    }

    // add to an existing article
    if(typeof mainCommentIdRelied === 'number'){
      for (const comment of this.comments) {
        if (comment.id === mainCommentIdRelied) {
          if (!comment.repliesComment) {
            comment.repliesComment = [];
          }
          comment.repliesComment.push(newComment);
          break;
        }
      }
    } else {
      // To do: the new main comment have no Id, if a the same user reply to his comment...
      // retrieve the id generated
      this.comments.push(newComment);
    }
  }

  getCommentsByArticle(idArticle: number) {
    return this.comments;
  }
}
