import { trigger, transition, style, animate, query, stagger, group } from "@angular/animations";

export const popupBonus =
trigger('popup-bonus', [
    transition(':enter', [
      // Hide elements

      query('.presentationTexts p, .firstSection .firstText, .firstSection li', style({ opacity: 0, transform: 'translateY(2rem)' }),  { optional: true }),
      query('.secondSection li, .secondSection blockquote', style({ opacity: 0, transform: 'translateY(2rem)' }),  { optional: true }),

      query('.scene', style({ opacity: 0 })),
      query('.userChoice', style({ opacity: 0 })),
      style({ transform: 'translateX(-100%)'}),

      // display elements
      animate('500ms ease-in-out', style({  transform: 'translateX(0)' })),

      query('.presentationTexts p, .firstSection .firstText, .firstSection li', [
        stagger(500, [
          animate('0.7s', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ], { delay: 0,  optional: true }),

      // Display scene
      query('.scene', [
        animate('0.5s', style({ opacity: 1 }))
      ], { delay: 500 }),

      group([
          // Display second section and deskop
          query('.secondSection li, .secondSection blockquote', [

            animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' }))

          ], { optional: true }),

          // Display action button
          query('.userChoice', [

              animate('0.5s', style({ opacity: 1 }))
          ]),
      ], { delay: 1000 })


    ]),
    transition(':leave', [
      animate('500ms ease-in-out', style({transform: ' translateX(100%)' }))
    ])
])