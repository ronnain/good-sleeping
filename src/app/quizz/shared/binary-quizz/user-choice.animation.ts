import { trigger, transition, style, animate, query, group, keyframes } from "@angular/animations";

export const userChoice =
trigger('user-choice', [

  transition(":increment", group([
    query(':enter', [
        style({ opacity: '0', transform: 'scale(80%)'}),
        animate('500ms ease-in-out', style({  opacity: '1', transform: 'scale(100%)' }))
     ], { optional: true, delay: 50 }),
    query(':leave', [
      group([
        animate('500ms ease-in-out', style({  transform: 'translateX(20%) rotate(10deg)', transformOrigin: 'bottom right',  opacity: '0' })),
        animate('500ms ease-in-out', keyframes([
          style({  background: '#e3fbe4' }),
          style({  background: '#c0f9c2' }),
          style({  background: '#33ff39' })
        ])),
      ])
    ], { optional: true })
   ])),

   transition(":decrement", group([
    query(':enter', [
        style({ opacity: '0', transform: 'scale(80%)'}),
        animate('500ms ease-in-out', style({  opacity: '1', transform: 'scale(100%)' }))
     ], { optional: true, delay: 50 }),
    query(':leave', [
      group([
        animate('500ms ease-in-out', style({  transform: 'translateX(-20%) rotate(-10deg)', transformOrigin: 'bottom left',opacity: '0' })),
        animate('500ms ease-in-out', keyframes([
          style({  background: '#f9d8d8' }),
          style({  background: '#f7a0a0' }),
          style({  background: '#ef0d0d' })
        ])),
      ])
    ], { optional: true })
   ])),
]);
