import { trigger, transition, style, animate, query, group, keyframes } from "@angular/animations";

export const backAction =
trigger('back-action', [

  transition(":increment", group([
    query(':enter', [
        style({  transform: 'translateX(20%) rotate(10deg)', transformOrigin: 'bottom right',  opacity: '0', background: '#33ff39' }),
        group([
          animate('500ms ease-in-out', style({  transform: 'translateX(0) rotate(0)', opacity: '1' })),
          animate('500ms ease-in-out', keyframes([
            style({  background: '#33ff39' }),
            style({  background: '#c0f9c2' }),
            style({  background: '#e3fbe4' }),
            style({  background: 'white' }),
          ]))
        ])
     ], { optional: true, delay: 50 }),
    query(':leave', [
      group([
        style({  opacity: '1', transform: 'scale(100%)' }),
        animate('500ms ease-in-out', style({ opacity: '0', transform: 'scale(80%)'}))
      ])
    ], { optional: true })
   ])),

   transition(":decrement", group([
    query(':enter', [
        style({  transform: 'translateX(-20%) rotate(-10deg)', transformOrigin: 'bottom left',  opacity: '0', background: '#ef0d0d' }),
        group([
          animate('500ms ease-in-out', style({  transform: 'translateX(0) rotate(0)', opacity: '1' })),
          animate('500ms ease-in-out', keyframes([
            style({  background: '#ef0d0d' }),
            style({  background: '#f7a0a0' }),
            style({  background: '#f9d8d8' }),
            style({  background: 'white' }),
          ]))
        ])
     ], { optional: true, delay: 50 }),
    query(':leave', [
      group([
        style({  opacity: '1', transform: 'scale(100%)' }),
        animate('500ms ease-in-out', style({ opacity: '0', transform: 'scale(80%)'}))
      ])
    ], { optional: true })
   ])),
]);
