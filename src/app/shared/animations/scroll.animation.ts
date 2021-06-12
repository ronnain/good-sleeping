import { animate, AnimationMetadata, sequence, style } from "@angular/animations";

export const hideBottomAnimation: AnimationMetadata = sequence([
    style({ opacity: 0, transform: 'translateY(200px)' })
]);

export const showBottomAnimation: AnimationMetadata = sequence([
    animate('500ms ease-in-out', style({  opacity: 1, transform: 'translateY(0)' }))
]);

export const hideLeftAnimation: AnimationMetadata = sequence([
    style({ opacity: 0, transform: 'translateX(-200px)' })
]);

export const showLeftAnimation: AnimationMetadata = sequence([
    animate('500ms ease-in-out', style({  opacity: 1, transform: 'translateX(0)' }))
]);

export const hideRightAnimation: AnimationMetadata = sequence([
    style({ opacity: 0, transform: 'translateX(200px)' })
]);

export const showRightAnimation: AnimationMetadata = sequence([
    animate('500ms ease-in-out', style({  opacity: 1, transform: 'translateX(0)' }))
]);