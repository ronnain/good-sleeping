import { AnimationBuilder, style, animate, AnimationMetadata, AnimationPlayer, keyframes, query, sequence } from '@angular/animations';
import { Directive, ElementRef, Inject, Input, PLATFORM_ID } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { hideBottomAnimation, hideLeftAnimation, hideRightAnimation, showBottomAnimation, showLeftAnimation, showRightAnimation } from '../animations/scroll.animation';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

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

    constructor(private element: ElementRef ,private builder: AnimationBuilder, @Inject(DOCUMENT) private _document, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        [this.hideAnimation, this.showAnimation] = this.animationMap[this.sideAnimation];
        fromEvent(this._document.window, 'scroll').pipe(throttleTime(500)).subscribe(event => {
            this.visible = this.checkVisible();

            if (this.visible && this.initialAnimation) {
                this.initialAnimation = false;
                this.playAnimation();
            }
        });
    }

    ngAfterViewInit() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.playAnimation()

    }

    private checkVisible() {
        const rect = this.element.nativeElement.getBoundingClientRect();
        const viewHeight = Math.max(this._document.documentElement.clientHeight, window.innerHeight);
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