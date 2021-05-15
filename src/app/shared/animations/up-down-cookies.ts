import { trigger, transition, style, animate } from "@angular/animations";

export const upDownCookiesAnimation =
  trigger('up-down', [
      transition(':enter', [
        style({ transform: 'translateY(100px)'}),
        animate('300ms ease-in-out', style({  transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({transform: ' translateY(100px)' }))
      ])
  ]);