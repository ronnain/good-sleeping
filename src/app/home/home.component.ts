import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../shared/services/header.service';
import { RouterLink } from '@angular/router';
import { RetrieveMailComponent } from '../shared/retrieve-mail/retrieve-mail.component';
import { AnimateThatDirective } from '../shared/directives/animation.directive';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [AnimateThatDirective, RetrieveMailComponent, MatButtonModule, RouterLink]
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
