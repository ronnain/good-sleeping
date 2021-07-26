import { trigger, transition, style, animate, query, group, keyframes } from "@angular/animations";

export const userChoice =
trigger('user-choice', [

  transition(":increment", group([
    query(':enter', [
        style({ opacity: '0', transform: 'scale(70%)'}),
        animate('500ms ease-in-out', style({  opacity: '1', transform: 'scale(100%)'}))
     ], { optional: true, delay: 50 }),
    query(':leave', [

      animate('500ms ease-in-out', style({  transform: 'translateX(20%) rotate(10deg)', transformOrigin: 'bottom right',  opacity: '0', background: '#c4c4ec' })),

    ], { optional: true })
   ])),

   transition(":decrement", group([
    query(':enter', [
        style({ opacity: '0', transform: 'scale(80%)'}),
        animate('500ms ease-in-out', style({  opacity: '1', transform: 'scale(100%)' }))
     ], { optional: true, delay: 50 }),
    query(':leave', [
      animate('500ms ease-in-out', style({  transform: 'translateX(-20%) rotate(-10deg)', transformOrigin: 'bottom left', opacity: '0', background: '#f7a0a0' })),
    ], { optional: true })
   ])),
]);
