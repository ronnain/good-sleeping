import { trigger, transition, style, animate } from "@angular/animations";

export const articleAnimation =
  trigger('articlesAnimation', [
      transition(':enter', [

        style({ transform: 'translateX(-100%)', opacity: 0}),

        animate('300ms 300ms ease-in-out', style({  transform: 'translateX(0)',  opacity: 1 })),

      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({  transform: 'translateX(100%)',  opacity: 0 })),
      ])
  ]);