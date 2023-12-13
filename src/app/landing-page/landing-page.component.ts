import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../shared/services/header.service';
import { ThemeColorService } from '../shared/services/theme-color.service';
import { RetrieveMailComponent } from '../shared/retrieve-mail/retrieve-mail.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    standalone: true,
    imports: [NgClass, RetrieveMailComponent]
})
export class LandingPageComponent implements OnInit, Page {

  bonusTitle = "Guide du Bon Dormeur : Programme pour retrouver un sommeil de qualité";
  metaDesc = 'Récupérer le bonus gratuit : ' + this.bonusTitle;

  constructor(
    public headerService: HeaderService,
    public themeColorService: ThemeColorService
  ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.bonusTitle, this.metaDesc);
  }
}
