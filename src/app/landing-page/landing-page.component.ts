import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, Page {

  bonusTitle = "Guide du Bon Dormeur : Programme pour retrouver un sommeil de qualité";
  metaDesc = 'Récupérer le bonus gratuit : ' + this.bonusTitle;

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.bonusTitle, this.metaDesc);
  }
}
