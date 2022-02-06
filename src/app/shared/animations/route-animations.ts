import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const appearance = trigger('routeAnimation', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(':enter', [animate('600ms ease', style({ opacity: 1 }))], {
      optional: true,
    }),
  ]),
]);

export const swipe = trigger('detailsAnimation', [
  state('initial', style({ right: '-52rem' })),
  state('expanded', style({ right: 0 })),
  transition('initial <=> expanded', animate('0.3s')),
]);
