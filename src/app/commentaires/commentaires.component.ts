import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../modeles/interfaces.type';
import { NgForm } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent implements OnInit {

  @Input()
  articleId: number;

  comments: Comment[];

  nbComment: number = 0;
  mainCommentIdRelied: number; //use when the user click on the btn reply
  responsToAuthor: string;
  showReply = false;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.comments = this.commentService.getCommentsByArticle(this.articleId)
  }

  onSubmit(form: NgForm) {
    console.log("addComment form value", form);
    const newComment: Comment = {
      author: form.value.firstName,
      date: new Date(),
      comment: form.value.newComment
    };
    this.commentService.addComment(this.articleId, newComment, this.mainCommentIdRelied);
  }

  reply(mainCommentId: number, responsToAuthor) {
    var elmnt = document.getElementById("commentSpace");
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

  /* addComment(mainCommentId?: number){
    if(mainCommentId) {
      this.addReplyComment(mainCommentId);
    }
  }

  addReplyComment(mainCommentId) {
    const targetComment = this.comments.filter(comment =>
      comment.id === mainCommentId);

    if(!targetComment) {
      console.log("une erreure est survenue")
    }
    const targetMainComment: Comment = targetComment[0];
    if(!targetMainComment.repliesComment){
      targetMainComment.repliesComment = []
    }
    console.log("Enregistrer en bdd");
    //targetMainComment.repliesComment.push(addedComment);
  } */

}
