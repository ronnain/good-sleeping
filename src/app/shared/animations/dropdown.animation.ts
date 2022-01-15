import { trigger, transition, style, animate, stagger, query } from "@angular/animations";

export const dropDownCategories =
  trigger('dropDownCategories', [
      transition(':enter', [

        query('.section-categories--mobile-wrapper__items__category', [
          style({ transform: 'translateX(-100%)', opacity: 0}),

          stagger(100, [
            animate('300ms ease-in-out', style({  transform: 'translateX(0)',  opacity: 1 })),
          ]),
        ], { delay: 0,  optional: true })

      ]),
      transition(':leave', [
        query('.section-categories--mobile-wrapper__items__category', [
          stagger(-100, [
            animate('300ms ease-in-out', style({  transform: 'translateX(100%)',  opacity: 0 })),
          ]),
        ], { delay: 0,  optional: true })
      ])
  ]);