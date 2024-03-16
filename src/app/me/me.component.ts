import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../shared/services/header.service';
import { RetrieveMailComponent } from '../shared/retrieve-mail/retrieve-mail.component';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css'],
    standalone: true,
    imports: [RetrieveMailComponent]
})
export default class MeComponent implements OnInit, Page {

  title = "Qui suis-je ? Romain 20 ans d'insomnie & Pourquoi je peux t'aider";
  metaDesc = 'Je te présent qui je suis, mon expérience avec l\'insomnie et pourquoi j\'ai monté ce blog sur le sommeil.';

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
  }
}
