import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {

  articleName: string;
  articleContent: string = "Article non trouvé";

  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.articleName = this._Activatedroute.snapshot.paramMap.get("articleName");
    this.readTextFile("assets/articles/"+this.articleName+".html");
  }

  readTextFile(file: any)
  {
    let rawFile = new XMLHttpRequest();
    let self = this;
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              self.articleContent = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
  }
}
