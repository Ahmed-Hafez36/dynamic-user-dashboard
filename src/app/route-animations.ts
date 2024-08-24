import { trigger, transition, style, animate, query } from '@angular/animations';

export const fadeInOutAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({ position: 'absolute', width: '100%', opacity: 0 })
      ], { optional: true }),
      query(':enter', [
        animate('200ms ease-in', style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ], { optional: true }),
    ])
  ]);