import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../modeles/interfaces.type';
import { NgForm } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  articleName: string;

  articleId: number;

  comments: Comment[];

  mainCommentIdRelied: number; //use when the user click on the btn reply
  responsToAuthor: string;
  showReply = false;

  showValidation = false;
  failSave = false;
  loading = false;

  constructor(private commentService: CommentService, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articleId = this.articlesService.getArticleIdByName(this.articleName);
    this.getArticleComments();
  }

  onSubmit(form: NgForm) {
    this.showValidation = false;
    this.failSave = false;
    this.loading = true;

    // prepare the data send
    const newComment: Comment = {
      firstName: form.value.firstName,
      date:  new Date(),
      comment: form.value.newComment,
      articleId: this.articleId
    };
    if (this.mainCommentIdRelied) {
      newComment.mainCommentId = this.mainCommentIdRelied;
    }

    // call the web service
    this.commentService.addComment(newComment).subscribe(
      data => {
        if (data.success) {
          newComment.id = data.success;
          this.showValidation = true;
          this.addComment(newComment, this.mainCommentIdRelied);
          // reset the form
          form.reset();

        } else {
          this.failSave = true;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.failSave = true;
      });
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
    this.commentService.getCommentsByArticle(this.articleId).subscribe(
      data => {
        this.comments = data,
      error => console.error('Une erreure est survenue à la récupération des commentaires !', error)
    });
  }
}
