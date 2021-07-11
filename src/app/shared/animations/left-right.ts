import { trigger, transition, style, animate, query, stagger, keyframes } from "@angular/animations";

export const leftRightAnimation =
trigger('left-right', [
    transition(':enter', [

      // Hide elements
      query('.step1', style({ opacity: 0 })),
      query('.step1 li', style({ opacity: 0 })),
      query('.nextStepBtn', style({ opacity: 0 })),
      style({ transform: 'translateX(-100%)'}),

      // display elements
      animate('500ms ease-in-out', style({  transform: 'translateX(0)' })),

      query('.step1', animate(500, style({ opacity: 1 })), { delay: 300 }),
      query('.nextStepBtn', animate(500, style({ opacity: 0.15 })), { delay: 300 }),


      query('.step1 li', [
        stagger(1500, [ // 1500
          animate('0.5s', style({ opacity: 1 }))
        ])
      ], { delay: 1500 }), //1500

      query('.nextStepBtn',
        animate(3000, keyframes([
          style({ opacity: 1, transform: 'translateY(0)' }),
          style({ transform: 'translateY(-30px)', filter: 'drop-shadow(10px 10px 5px var(--primary-main))' }),
          style({ transform: 'translateY(0)', filter: "drop-shadow(0 0)" }),
          style({ transform: 'translateY(-30px)', filter: 'drop-shadow(10px 10px 5px var(--primary-main))' }),
          style({ transform: 'translateY(0)', filter: "drop-shadow(0 0)" }),
          style({ transform: 'translateY(-30px)', filter: 'drop-shadow(10px 10px 5px var(--primary-main))' }),
          style({ transform: 'translateY(0)', filter: "drop-shadow(0 0)" })
        ])
        ), { delay: 500 }),

    ]),
    transition(':leave', [
      animate('500ms ease-in-out', style({transform: ' translateX(100%)' })),
    ])
])