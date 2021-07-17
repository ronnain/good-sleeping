import { trigger, transition, style, animate, query, group, keyframes } from "@angular/animations";

export const leftRightCard =
trigger('left-right-card', [

  transition(":increment", group([
    query(':enter', [
        style({ transform: 'translateX(-100%) rotate(-45deg)', opacity: '0'}),
        animate('500ms ease-in-out', style({  transform: 'translateX(0) rotate(0)', opacity: '1' }))
     ], { optional: true }),
    query(':leave', [
      group([
        animate('500ms ease-in-out', style({  transform: 'translateX(100%) rotate(45deg)', opacity: '0' })),
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
        style({ transform: 'translateX(100%) rotate(45deg)', opacity: '0'}),
        animate('500ms ease-in-out', style({  transform: 'translateX(0) rotate(0)', opacity: '1' }))
     ], { optional: true }),
    query(':leave', [
      group([
        animate('500ms ease-in-out', style({  transform: 'translateX(-100%) rotate(-45deg)', opacity: '0' })),
        animate('500ms ease-in-out', keyframes([
          style({  background: '#f9d8d8' }),
          style({  background: '#f7a0a0' }),
          style({  background: '#ef0d0d' })
        ])),
      ])
    ], { optional: true })
   ])),
])