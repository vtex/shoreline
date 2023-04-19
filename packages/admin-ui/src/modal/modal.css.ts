import { csx, dataAttr } from '@vtex/admin-ui-core'

const modalPaddingHeight = '64px'
const modalHeight = `calc(100vh - ${modalPaddingHeight})`
const modalHeaderHeight = '64px'
const modalFooterHeight = '94px'
const modalContentMaxHeight = `calc(${modalHeight} - calc(${modalHeaderHeight} + ${modalFooterHeight}))`

export const modalHeaderTheme = csx({
  bg: '$primary',
  padding: '$space-6 $space-7',
  borderTopLeftRadius: '$base',
  borderTopRightRadius: '$base',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [dataAttr('compact', true)]: {
    border: 'none',
  },
  [dataAttr('compact', false)]: {
    borderBottom: '$neutral',
    position: 'sticky',
    top: 0,
  },
  [dataAttr('has-shadow', true)]: {
    boxShadow: '$overlay.bottom',
  },
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
  borderBottomRightRadius: '$base',
  borderBottomLeftRadius: '$base',
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'flex-end',
  'button + button': {
    marginLeft: '$space-3',
  },
  [dataAttr('compact', true)]: {
    border: 'none',
    paddingX: '$space-7',
    paddingBottom: '$space-7',
  },
  [dataAttr('compact', false)]: {
    borderTop: '$neutral',
    padding: '$space-7',
    position: 'sticky',
    bottom: 0,
  },
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
  borderRadius: '$base',
  zIndex: '$z-9',
  [dataAttr('size', 'small')]: {
    width: '23rem',
  },
  [dataAttr('size', 'medium')]: {
    width: '35rem',
  },
  [dataAttr('size', 'large')]: {
    width: '50rem',
  },
})
