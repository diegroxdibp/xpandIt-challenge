import { animate, style, transition, trigger } from "@angular/animations"

export const slideX = [
  trigger('slideX', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-300px)' }),
      animate(
        '300ms 400ms ease-in',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'translateX(300px)' })
      ),
    ]),
  ])
]

export const slideY = [
  trigger('slideY', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-50px)' }),
      animate(
        '300ms ease-in',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'translateY(-50px)' })
      ),
    ]),
  ])
]
