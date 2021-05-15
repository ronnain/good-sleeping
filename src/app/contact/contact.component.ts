import { Component, OnInit } from '@angular/core';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, Page {

  title = "Contact - Adresse mail - Sommeil Profond";
  metaDesc = "Contact Sommeil Profond - Comment me contacter ? Adresse mail pour me contacter.";

  constructor(
    public headerService: HeaderService
    ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
  }
}
