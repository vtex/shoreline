import { csx } from '@vtex/admin-ui-core'
import { variant } from './util'

const modalPaddingHeight = '64px'
const modalHeight = `calc(100vh - ${modalPaddingHeight})`
const modalHeaderHeight = '64px'
const modalFooterHeight = '94px'
const modalContentMaxHeight = `calc(${modalHeight} - calc(${modalHeaderHeight} + ${modalFooterHeight}))`

export const modalHeaderTheme = csx({
  bg: '$primary',
  padding: '$space-6 $space-7',
  borderTopLeftRadius: '$border-radius-base',
  borderTopRightRadius: '$border-radius-base',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...variant('compact', 'true', {
    border: 'none',
  }),
  ...variant('compact', 'false', {
    borderBottom: '$neutral',
    position: 'sticky',
    top: 0,
  }),
  ...variant('has-shadow', 'true', {
    boxShadow: '$overlay.bottom',
  }),
})

export const modalTitleTheme = csx({
  text: '$title1',
})

export const modalContentTheme = csx({
  padding: '$space-6 $space-7',
  maxHeight: modalContentMaxHeight,
  overflow: 'hidden auto',
})

export const modalFooterTheme = csx({
  bg: '$primary',
  borderBottomRightRadius: '$border-radius-base',
  borderBottomLeftRadius: '$border-radius-base',
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'flex-end',
  'button + button': {
    marginLeft: '$space-3',
  },
  ...variant('compact', 'true', {
    border: 'none',
    paddingX: '$space-7',
    paddingBottom: '$space-7',
  }),
  ...variant('compact', 'false', {
    borderTop: '$neutral',
    padding: '$space-7',
    position: 'sticky',
    bottom: 0,
  }),
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
  maxHeight: modalHeight,
  margin: '$space-8',
  position: 'relative',
  bg: '$primary',
  borderRadius: '$border-radius-base',
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
