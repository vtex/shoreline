import { csx } from '@vtex/admin-ui-core'
import { variant } from './util'

export const modalHeaderTheme = csx({
  bg: '$primary',
  padding: '$space-6 $space-7',
})

export const modalContentTheme = csx({
  padding: '$space-6 $space-7',
})

export const modalFooterTheme = csx({
  padding: '$space-6 $space-7',
})

export const modalBackdropTheme = csx({
  '[data-backdrop]': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bg: '$overlay',
  },
})

export const modalTheme = csx({
  bg: '$primary',
  borderRadius: '$default',
  ...variant('fluid', 'true', {
    maxHeight: '30rem',
  }),
  ...variant('fluid', 'false', {
    height: '30rem',
    '> * [data-modal-scrollable-content]': {
      height: '260px',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  }),
  ...variant('size', 'small', {
    width: '23rem',
  }),
  ...variant('size', 'medium', {
    width: '35rem',
  }),
  ...variant('size', 'large', {
    width: '50rem',
  }),
})
