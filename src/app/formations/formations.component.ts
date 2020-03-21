import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  ebook: Product = {
    title : "Ebook",
    description : "Superbe livre pour réussir à dormir",
    price : 12,
    src : "assets/logo/zzzLogo.png"
  }

  constructor() {}

  ngOnInit() {
  }

}
