import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-article-tag',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.css']
})
export class ArticleTagComponent implements OnInit {

  article: string;
  imgPath = environment.serverConfig.imgPath;

  articlePath: string;
  articleTitle: string;
  linkImgCreator:string;

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
    //Clean img tag
    this.article = this.article.replace(/<p><img\s*(alt="[a-zA-Z0-9_= .]*"|src="[a-zA-Z0-9_= ./]*"|title="[a-zA-Z0-9_= .]*"|\s*)*><\/p>/g, '<img/>');

    this.addPictureTag();
  }

  addPictureTag() {
    /* <picture>
        <source  media="(min-width: 1200px)" srcset="http://localhost:80/sleeping-bs/img/sommeil-reparateur/article/xl.jpg">
        <source  media="(min-width: 992px)" srcset="http://localhost:80/sleeping-bs/img/sommeil-reparateur/article/l.jpg">
        <source  media="(min-width: 768px)" srcset="http://localhost:80/sleeping-bs/img/sommeil-reparateur/article/xm.jpg">
        <source  media="(min-width: 576px)" srcset="http://localhost:80/sleeping-bs/img/sommeil-reparateur/article/m.jpg">
        <img src="http://localhost:80/sleeping-bs/img/sommeil-reparateur/article/xs.jpg" alt="Mer calme et réparatrice" title="Mer calme et réparatrice" class="noMarginBottom fullWidth">
      </picture>
      <div class="creditImgDiv"><a class="creditImg" href="https://photostockeditor.com/" target="_blank" rel="nofollow">Lien Créateur Image</a></div>
 */
    const imgSrc = this.imgPath+this.articlePath+'/article/';
    const picture = document.createElement("PICTURE");
    const imgSizes = {
      "xl" : "1200",
      "l" : "992",
      "xm" : "768",
      "m" : "576"
    };

    for(let size in imgSizes) {
      const source = document.createElement("source");
      source.setAttribute("media", "(min-width: "+imgSizes[size]+"px)");
      source.setAttribute("srcset", imgSrc+size+'.jpg');
      picture.appendChild(source);
    }

    const img = document.createElement("img");
    img.setAttribute("src", imgSrc+'xs.jpg');
    img.setAttribute("alt", this.articleTitle);
    img.setAttribute("title", this.articleTitle);
    img.setAttribute("class", "noMarginBottom fullWidth");
    picture.appendChild(img);

    // Link to the img creator
    const aLink = document.createElement("a");
    aLink.setAttribute("class", "creditImgDiv");
    aLink.setAttribute("href", this.linkImgCreator);
    aLink.setAttribute("target", "_blank");
    aLink.setAttribute("rel", "nofollow");
    aLink.innerHTML = "Lien Créateur Image";

    const divLink = document.createElement("div");
    divLink.setAttribute("class", "creditImg");
    divLink.appendChild(aLink);

    const splitArticle = this.article.split('<img/>');
    this.article = splitArticle[0]+ picture.outerHTML + divLink.outerHTML + splitArticle[1];
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
