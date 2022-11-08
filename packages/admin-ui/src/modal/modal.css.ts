import { csx } from '@vtex/admin-ui-core'

export const modalHeaderTheme = csx({})

export const modalContentTheme = csx({})

export const modalFooterTheme = csx({})

export const modalBackdropTheme = csx({
  '[data-backdrop]': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsl(204 10% 10% / 0.1)',
    backdropFilter: 'blur(4px)',
  },
})

export const modalTheme = csx({
  bg: '$primary',
})
