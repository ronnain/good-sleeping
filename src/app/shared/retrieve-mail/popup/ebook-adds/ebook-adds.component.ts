import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MobileService } from '../../../services/mobile.service';
import { Carousel3dComponent } from '../carousel3d/carousel3d.component';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'ebook-adds',
    templateUrl: './ebook-adds.component.html',
    styleUrls: ['./ebook-adds.component.css'],
    standalone: true,
    imports: [NgClass, MatIconModule, NgIf, Carousel3dComponent]
})
export class EbookAddsComponent implements OnInit {

  @Output() userAcceptsBonus = new EventEmitter<boolean>();
  @Output() userRefusesBonus = new EventEmitter<boolean>();

  isMobile: boolean;

  constructor(private mobileService: MobileService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;
  }

  onUserAcceptsBonus() {
    this.userAcceptsBonus.emit(true);
  }

  onUserRefusesBonus() {
    this.userRefusesBonus.emit(true);
  }
}
