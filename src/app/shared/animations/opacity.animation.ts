import { trigger, transition, style, animate, AnimationMetadata } from "@angular/animations";

export const opacityAnimationMeta: AnimationMetadata[] = [
  style({ opacity: 0}),
  animate('500ms 50ms ease-in-out', style({ opacity: 1 })),
];

export const opacityAnimation =
  trigger('opacityAnimation', [
      transition(':enter', opacityAnimationMeta),
      transition(':increment', opacityAnimationMeta)
  ]);