import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'carousel3d',
  templateUrl: './carousel3d.component.html',
  styleUrls: ['./carousel3d.component.css']
})
export class Carousel3dComponent implements OnInit {

  @ViewChild("carousel") carousel: ElementRef;

  cellCount = 3;
  selectedIndex = 0;

  cell1Rotation = 0
  cell2Rotation = 1;
  cell3Rotation = -1;
  rotationOrder = [1, 2, 3];


  constructor() { }

  ngOnInit(): void {
  }

  rotateCarousel() {
    const angle = this.selectedIndex / this.cellCount * -360;
    this.carousel.nativeElement.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
  }

  rotateLeft() {
    this.selectedIndex--;
    this.rotateCarousel();
  }

  rotateRight() {
    this.selectedIndex++;
    this.rotateCarousel();
  }

  rotateTo(indexToRotate: number) {
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
}
