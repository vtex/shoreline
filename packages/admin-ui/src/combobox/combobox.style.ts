import { style } from '@vtex/admin-ui-core'

const height = '3rem'
const width = '21.625rem'

export const container = style({
  width,
})

export const input = style({
  width,
  height,
  paddingX: '$3',
  text: '$body',
  paddingTop: '$4',
  bg: '$form.neutral',
  border: '$form.neutral',
  borderRadius: '$default',
  marginY: '$1',
  color: '$form.neutral',
  outline: 0,
  transition: 'snap',
  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus': {
    border: '$form.neutralFocus',
    boxShadow: '$ring.neutral',
  },
  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
  },
})

export const buttonContainer = style({
  right: 0,
  top: 1,
  height: '2.875rem',
  paddingRight: '$3',
  position: 'absolute',
  display: 'flex',
  color: '$primary',
})

export const clearButton = style({
  marginTop: '$2',
  marginRight: '$1',
  color: '$secondary',
})

export const popover = style({
  width,
  padding: '$3',
  bg: '$primary',
  boxShadow: '$overlay.center',
  border: '$neutral',
  borderRadius: '$default',
  zIndex: 9999999,
})

export const item = style({
  text: '$body',
  borderRadius: '$default',
  paddingY: '$2',
  paddingX: '$3',
  cursor: 'pointer',
  '&[data-active-item]': {
    bg: '$action.neutral.tertiaryPressed',
    color: '$action.neutral.tertiaryPressed',
  },
  ':hover': {
    bg: '$action.neutral.tertiaryHover',
    color: '$action.neutral.tertiaryHover',
  },
})

export const itemMultiple = style({
  ...item,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 'none',
})

export const fieldTag = style({
  bg: '#f4f4f4',
  text: '$body',
  padding: '$narrow.s',
  borderRadius: '$default',
})
