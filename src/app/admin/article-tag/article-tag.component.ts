import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-article-tag',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.css']
})
export class ArticleTagComponent implements OnInit {

  article: string;
  imgPath = environment.serverConfig.imgPath;

  articleName: string;
  articleTitle: string;
  linkImgCreator:string;

  listImg : any[];
  imgDetected: number = 0;
  picturesAdded: number = 0;

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
    this.countImg();
    this.picturesAdded = 0;
    if(this.listImg && this.listImg.length){
      this.picturesAdded = this.listImg.length;
      this.addPictureTag();
    }
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
    for (let img of this.listImg){
      const imgSrc = this.imgPath+ img.articleName +'/article/';
      const picture = document.createElement("PICTURE");
      // the xs size is added in the img balise and no s size for article image
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

      const imgElem = document.createElement("img");
      imgElem.setAttribute("src", imgSrc + 'xs.jpg');
      imgElem.setAttribute("alt", img.articleTitle);
      imgElem.setAttribute("title", img.articleTitle);
      imgElem.setAttribute("class", "noMarginBottom fullWidth");
      picture.appendChild(imgElem);

      // add the link to the img creator
      if(img.linkImgCreator) {
        const aLink = document.createElement("a");
        aLink.setAttribute("class", "creditImg");
        aLink.setAttribute("href", img.linkImgCreator);
        aLink.setAttribute("target", "_blank");
        aLink.setAttribute("rel", "nofollow");
        aLink.innerHTML = "Lien Créateur Image";

        const divLink = document.createElement("div");
        divLink.setAttribute("class", "creditImgDiv");
        divLink.appendChild(aLink);
        picture.append(divLink);
      }
      this.article = this.article.replace(/<img\/>/i, picture.outerHTML);
    }
  }

  copyToClipBoard() {
    // Copy to clipboard
    const articleInput = <HTMLTextAreaElement>document.getElementById("articleInput");
    articleInput.focus();
    articleInput.select();
    document.execCommand('copy');
    articleInput.setSelectionRange(0, 0);
  }

  addImg(){
    if(!this.listImg) {
      this.listImg = [];
    }
    this.listImg.push({});
  }

  delImg(index: number) {
    if(!this.listImg) {
      return;
    }
   this.listImg.splice(index, 1);
  }

  isDesabled() {
    if(!this.article) {
      return true;
    }
    if(this.listImg) {
      for(let img of this.listImg){
        if(!img.articleName ||  !img.articleTitle) {
          return true;
        }
      }
    }
    return false;
  }

  countImg(){
    this.imgDetected = 0;
    this.imgDetected = (this.article.match(/<img\/>/g) || []).length;
  }
}
