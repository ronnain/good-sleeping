import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { environment } from 'src/environments/environment';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, Page {

  title = "Le blog pour retrouver un sommeil réparateur et être en pleine forme"
  metaDesc = "Ton guide du sommeil pour être en pleine forme. Dans chaque publication, je t'apprends à bien dormir et je réponds à toutes tes questions.";
  imgFeatherPath = environment.serverConfig.imgPath+"fond_plume.png";

  constructor(
    public headerService: HeaderService
    ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
  }
}
