import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../modeles/interfaces.type';
import { NgForm } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent implements OnInit {

  @Input()
  articleName: string;

  articleId: number;

  comments: Comment[];

  mainCommentIdRelied: number; //use when the user click on the btn reply
  responsToAuthor: string;
  showReply = false;

  constructor(private commentService: CommentService, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articleId = this.articlesService.getArticleIdByName(this.articleName);
    this.getArticleComments();
  }

  onSubmit(form: NgForm) {
    const newComment: Comment = {
      firstName: form.value.firstName,
      date:  new Date(),
      comment: form.value.newComment,
      articleId: this.articleId
    };
    if (this.mainCommentIdRelied) {
      newComment.mainCommentId = this.mainCommentIdRelied;
    }
    this.commentService.addComment(newComment).subscribe(data => {
      newComment.id = data;
    });
    this.addComment(newComment, this.mainCommentIdRelied);
  }

  addComment(newComment:Comment, mainCommentId: number) {
    if(mainCommentId) {
      const mainComment = this.comments.filter(comment =>
        comment.id === mainCommentId)[0];
        if (!mainComment.repliesComment) {
          mainComment.repliesComment = [];
        }
        mainComment.repliesComment.push(newComment);
    } else {
      if (!this.comments) {
        this.comments = [];
      }
      // add the comment to the comments
      this.comments.push(newComment);
    }
  }

  reply(mainCommentId: number, responsToAuthor) {
    var elmnt = document.getElementById("commentForm");
    elmnt.scrollIntoView();
    this.responsToAuthor = responsToAuthor;
    this.mainCommentIdRelied = mainCommentId;
    this.showReply = true;
  }

  cancelReply(){
    this.responsToAuthor = undefined;
    this.mainCommentIdRelied = undefined;
    this.showReply = false;
  }

  getArticleComments() {
    this.commentService.getCommentsByArticle(this.articleId).subscribe(data => {
      this.comments = data,
      error => console.error('Une erreure est survenue à la récupération des commentaires !', error)
    });
  }
}
