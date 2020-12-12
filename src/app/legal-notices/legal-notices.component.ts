import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-legal-notices',
  templateUrl: './legal-notices.component.html',
  styleUrls: ['./legal-notices.component.css']
})
export class LegalNoticesComponent implements OnInit, Page {

  title = "Mentions légales - Hébergeur - Données personnelles";
  metaDesc = "Vous trouverez ici toutes les mentions légales du site Sommeil Profond, l'hébergeur et le traitement des données personnelles.";

  constructor(
    public headerService: HeaderService
  ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
  }
}
