import { trigger, transition, style, animate, query, group, keyframes } from "@angular/animations";

export const completeQuizz =
trigger('completeQuizz', [
  transition(':enter', [
    style({ opacity: '0', transform: 'scale(70%)'}),
    query(".iconEnd", style({ opacity: '0', transform: 'scale(0%)'})),

    animate('500ms 500ms ease-in-out', style({  opacity: '1', transform: 'scale(100%)'})),
    query(".iconEnd", animate('500ms ease-in-out', style({  opacity: '1', transform: 'scale(100%)'}))),

  ]),
  transition(':leave', [
    group([
      animate('500ms ease-in-out', style({  opacity: '0', transform: 'scale(0%)'})),
      query(".iconEnd", animate('500ms ease-in-out', style({  opacity: '0', transform: 'scale(0%)'}))),
    ])
  ])
]);