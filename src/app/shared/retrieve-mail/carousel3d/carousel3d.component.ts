import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'carousel3d',
  templateUrl: './carousel3d.component.html',
  styleUrls: ['./carousel3d.component.css']
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


  constructor() { }

  ngOnInit(): void {
    this.setAutomaticRotation();
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
    interval(2300).subscribe(x => {
      if (this.clicked) {
        this.clicked = false;
        return;
      }
      // Rotate to the right
      const indexToRotate = this.rotationOrder[1];
      this.rotateTo(indexToRotate);
    });
  }

  onLinkClicked() {
    this.linkClicked.emit(true);
  }
}
