import { trigger, transition, style, animate } from "@angular/animations";

export const fadeIn =
trigger('fade-in', [
    transition(':enter', [
      style({ opacity: 0}),
      animate('10000ms ease-in-out', style({  opacity: 0 })),
    ])
]);