import { trigger, transition, style, animate, query, group, keyframes } from "@angular/animations";

export const backAction =
trigger('back-action', [

  transition(":increment", group([
    query(':enter', [

        style({  transform: 'translateX(20%) rotate(10deg)', transformOrigin: 'bottom right',  opacity: '0', background: '#c4c4ec' }),
        animate('500ms ease-in-out', style({  transform: 'translateX(0) rotate(0)', opacity: '1', background: 'white' })),

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

        style({  transform: 'translateX(-20%) rotate(-10deg)', transformOrigin: 'bottom left',  opacity: '0', background: '#f7a0a0' }),
        animate('500ms ease-in-out', style({  transform: 'translateX(0) rotate(0)', opacity: '1', background: 'white' })),

     ], { optional: true, delay: 50 }),
    query(':leave', [
      group([
        style({  opacity: '1', transform: 'scale(100%)' }),
        animate('500ms ease-in-out', style({ opacity: '0', transform: 'scale(80%)'}))
      ])
    ], { optional: true })
   ])),
]);
