import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { MobileService } from '../../../services/mobile.service';
import { NgClass } from '@angular/common';
import { SwipeDirective } from '../../../directives/swipe.directive';

@Component({
    selector: 'carousel3d',
    templateUrl: './carousel3d.component.html',
    styleUrls: ['./carousel3d.component.scss'],
    standalone: true,
    imports: [SwipeDirective, NgClass]
})
export class Carousel3dComponent implements OnInit {

  @Output() linkClicked = new EventEmitter<boolean>();

  @ViewChild("carousel") carousel: ElementRef;

  cellCount = 3;
  selectedIndex = 0;
  cell1Rotation = 0
  cell2Rotation = 1;
  cell3Rotation = -1;
  rotationOrder = [1, 2, 3];
  displayedIndex = 1;

  clicked = false;

  isMobile:boolean;

  constructor(private mobileService: MobileService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile;
    this.setAutomaticRotation();
  }

  rotateCarousel() {
    const angle = this.selectedIndex / this.cellCount * -360;
    this.carousel.nativeElement.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
  }

  rotateLeft() {
    const indexToRotate = this.rotationOrder[2];
    this.rotateTo(indexToRotate);
  }

  rotateRight() {
    const indexToRotate = this.rotationOrder[1];
    this.rotateTo(indexToRotate);
  }

  rotateTo(indexToRotate: number) {
    this.displayedIndex = indexToRotate;
    const index = this.rotationOrder.indexOf(indexToRotate);
    if (index === 1) { // Rotate to the right
      this.selectedIndex ++;
      this.rotationOrder.push(this.rotationOrder.shift());
    } else if (index === 2) { // Rotate to the left
      this.selectedIndex --;
      this.rotationOrder.unshift(this.rotationOrder.pop());
    }
    this.rotateCarousel();
  }

  setAutomaticRotation() {
    setTimeout(() => {
      interval(2300).subscribe(x => {
        if (this.clicked) {
          this.clicked = false;
          return;
        }
        // Rotate to the right
        this.rotateRight();
      });
    }, 4000);
  }

  onRotateNext() {
    this.clicked = true;
    this.rotateRight();
  }

  onRotatePrevious() {
    this.clicked = true;
    this.rotateLeft();
  }

  onLinkClicked() {
    this.linkClicked.emit(true);
  }
}
