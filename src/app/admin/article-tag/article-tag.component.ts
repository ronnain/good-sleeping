import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-tag',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.css']
})
export class ArticleTagComponent implements OnInit {

  article;

  constructor() { }

  ngOnInit() {
  }

  handleTag() {
    this.article = this.article.replace(/<head>.*<\/head>/g, '');
    this.article = this.article.replace(/id="[a-zA-Z0-9_= .]*"/g, '');
    this.article = this.article.replace(/class="[a-zA-Z0-9_= .]*"/g, '');
    this.article = this.article.replace(/style="[a-zA-Z0-9_= .:;()\-#]*"/g, '');
    this.article = this.article.replace(/<span\s*>/gi, '');
    this.article = this.article.replace(/<\/span>/gi, '');
    this.article = this.article.replace(/\s+>/gi, '>');
    this.article = this.article.replace(/<p><\/p>/gi, '');
    this.article = this.article.replace(/<(html|\/html|body|\/body)>/g, '');
    this.article = this.article.replace(/\s*href="https:\/\/www\.google\.com\/url\?q=/g, ' href="');
    this.article = this.article.replace(/&[a-zA-Z0-9_= .:;()\-#&]*"/g, '"');
  }

  copyToClipBoard() {
    // Copy to clipboard
    const articleInput = <HTMLTextAreaElement>document.getElementById("articleInput");
    articleInput.focus();
    articleInput.select();
    document.execCommand('copy');
    articleInput.setSelectionRange(0, 0);
  }

}
