import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit, Page {

  title = "Qui suis-je ? Romain 20 ans d'insomnie & Pourquoi je peux t'aider";
  metaDesc = 'Je te présent qui je suis, mon expérience avec l\'insomnie et pourquoi j\'ai monté ce blog sur le sommeil.';

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
  }
}
