import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'social-network-share-buttons',
  templateUrl: './social-network-share-buttons.component.html',
  styleUrls: ['./social-network-share-buttons.component.css']
})
export class SocialNetworkShareButtonsComponent implements OnInit {

  @Input()
  articleUrl: string;

  @Input()
  articleImg: string;

  constructor() { }

  ngOnInit(): void {
  }

}
