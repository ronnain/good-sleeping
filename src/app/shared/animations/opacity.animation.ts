import { trigger, transition, style, animate, AnimationMetadata } from "@angular/animations";

export const opacityAnimation: AnimationMetadata[] = [
  style({ opacity: 0}),
  animate('500ms 50ms ease-in-out', style({ opacity: 1 })),
];

export const opacityAniamtion =
  trigger('opacityAniamtion', [
      transition(':enter', opacityAnimation),
      transition(':increment', opacityAnimation)
  ]);