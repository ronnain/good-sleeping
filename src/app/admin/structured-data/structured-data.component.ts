import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';


@Component({
  selector: 'app-structured-data',
  templateUrl: './structured-data.component.html',
  styleUrls: ['./structured-data.component.css']
})
export class StructuredDataComponent implements OnInit {

  articleName: string;
  creationDate: string;
  imgName: string;
  title: string;


  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
  }

  getArticleParam() {
    this.articlesService.getArticleByName(this.articleName).subscribe(
      data => {
        this.creationDate = data.datePublished,
        this.title = data.title,
        this.imgName = data.img

        error => console.error('Une erreure est survenue à la récupération de l\'artcile !', error)
      });
  }
}
