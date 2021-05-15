import { trigger, transition, style, animate } from "@angular/animations";

export const leftRightAnimation =
trigger('left-right', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)'}),
      animate('500ms ease-in-out', style({  transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
      animate('500ms ease-in-out', style({transform: ' translateX(100%)' }))
    ])
])