import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Comment } from '../../../modeles/interfaces.type';
import { NgForm, FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { ArticlesService } from '../../services/articles.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css'],
    standalone: true,
    imports: [NgFor, MatButtonModule, FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatProgressBarModule, DatePipe]
})
export class CommentComponent implements OnInit {

  @Input()
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
  }

  loadComments() {
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
    const elmnt = document.getElementById("commentForm");
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

  ngOnChanges(changes: SimpleChanges) {
    // call when the user select another article
    if (changes['articleId'] && changes['articleId'].currentValue && changes['articleId'].currentValue !== 0) {
      this.loadComments();
    }
  }
}
