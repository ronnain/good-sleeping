import { AnimationBuilder, style, animate, AnimationMetadata, AnimationPlayer, keyframes, query, sequence } from '@angular/animations';
import { Directive, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { hideBottomAnimation, hideLeftAnimation, hideRightAnimation, showBottomAnimation, showLeftAnimation, showRightAnimation } from '../animations/scroll.animation';

@Directive({
    selector: '[animateThat]',
    standalone: true
})
export class AnimateThatDirective {

    @Input()
    sideAnimation: "left" | "right" | "bottom" = "bottom";

    animationMap = {
        left: [hideLeftAnimation, showLeftAnimation],
        right: [hideRightAnimation, showRightAnimation],
        bottom: [hideBottomAnimation, showBottomAnimation]
    }

    hideAnimation: AnimationMetadata;
    showAnimation: AnimationMetadata;

    visible:boolean = false;
    initialAnimation: boolean = true;

    constructor(private element: ElementRef ,private builder: AnimationBuilder) { }

    ngOnInit() {
        [this.hideAnimation, this.showAnimation] = this.animationMap[this.sideAnimation];
        fromEvent(window, 'scroll').pipe(throttleTime(500)).subscribe(event => {
            this.visible = this.checkVisible();

            if (this.visible && this.initialAnimation) {
                this.initialAnimation = false;
                this.playAnimation();
            }
        });
    }

    ngAfterViewInit() {
        this.playAnimation()

    }

    private checkVisible() {
        const rect = this.element.nativeElement.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
      }

    public playAnimation(): void {
        const el = this.element.nativeElement;
        const animation = this.visible ? this.showAnimation : this.hideAnimation;

        const player = this.playerFor(el, animation);

        player.play();
    }

    private playerFor(el: ElementRef, animation: AnimationMetadata): AnimationPlayer {
        const factory = this.builder.build(animation);
        return factory.create(el);
    }
}