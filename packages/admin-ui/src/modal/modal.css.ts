import { csx } from '@vtex/admin-ui-core'
import { variant } from './util'

const scrollContentHeight = '16.25rem'

export const modalHeaderTheme = csx({
  bg: '$primary',
  padding: '$space-6 $space-7',
  borderTopLeftRadius: '$default',
  borderTopRightRadius: '$default',
  borderBottom: '$neutral',
})

export const modalContentTheme = csx({
  padding: '$space-6 $space-7',
})

export const modalFooterTheme = csx({
  padding: '$space-6 $space-7',
  borderBottomRightRadius: '$default',
  borderBottomLeftRadius: '$default',
  borderTop: '$neutral',
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  bg: '$primary',
  borderRadius: '$default',
  ...variant('fluid', 'true', {
    maxHeight: '30rem',
    '> * [data-modal-scrollable-content]': {
      maxHeight: scrollContentHeight,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
  }),
  ...variant('fluid', 'false', {
    height: '30rem',
    '> * [data-modal-scrollable-content]': {
      height: scrollContentHeight,
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
