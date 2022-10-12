import { style, styleVariants } from '@vtex/admin-ui-core'

export const label = style({
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'flex-end',
})

export const loading = style({ height: '1rem', width: '4.125rem' })

export const variants = styleVariants({
  size: {
    small: {
      width: '6.5rem',
    },
    medium: {
      width: '7.5rem',
    },
    large: {
      width: '7.75rem',
    },
    xlarge: {
      width: '8.25rem',
    },
  },
})