import { csx, cx, dataAttr, style, styleVariants } from '@vtex/admin-ui-core'
import { action as actionColorScheme } from '../button/button.css'

const height = '3rem'
const width = '21.625rem'

export const container = style({
  width,
})

export const input = style({
  width,
  height,
  paddingX: '$space-3',
  text: '$body',
  paddingTop: '$space-4',
  bg: '$form.neutral',
  border: '$form.neutral',
  borderRadius: '$base',
  marginY: '$space-1',
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
  right: '$space-0',
  top: '$space-1',
  height: '2.875rem',
  paddingRight: '$space-3',
  position: 'absolute',
  display: 'flex',
  color: '$primary',
})

export const clearButtonTheme = csx({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
  marginTop: '$space-2',
  marginRight: '$space-1',
  padding: '$space-2 $space-3',
  height: '2.25rem',
  ...actionColorScheme({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  color: '$secondary',
})

export const popover = style({
  width,
  padding: '$space-3',
  bg: '$primary',
  boxShadow: '$overlay.center',
  border: '$neutral',
  borderRadius: '$base',
  zIndex: '$z-4',
})

export const item = style({
  text: '$body',
  borderRadius: '$base',
  paddingY: '$space-2',
  paddingX: '$space-3',
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
  bg: '$action.neutral.secondary',
  color: '$primary',
  text: '$body',
  paddingY: '$space-1',
  paddingX: '$space-2',
  borderRadius: '$base',
  ':hover': {
    bg: '$action.neutral.secondaryHover',
  },
  ':active': {
    bg: '$action.neutral.secondaryPressed',
  },
})

export const fieldTagDismiss = style({
  padding: '$space-0',
  marginLeft: '$space-2',
  bg: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$secondary',
})

export const fieldMultipleContainer = style({
  width: 500,
  display: 'flex',
  cursor: 'text',
  position: 'relative',
  border: '$form.neutral',
  borderRadius: '$base',
  paddingY: '$space-2',
  paddingX: '$space-3',

  ':hover': {
    border: '$form.neutralHover',
  },
  ':focus-within': {
    border: '$form.neutralFocus',
  },
})

export const label = style({
  position: 'absolute',
  text: '$body',
  zIndex: '$z-2',
  left: 12,
  color: '$secondary',
  transformOrigin: 'top left',
  transition: 'all 0.2s ease-out;',
})

export const labelTransition = styleVariants({
  reduced: {
    true: {
      transform: 'translate(1px, 0px) scale(0.875)',
    },
    false: {
      transform: 'translate(0, 9px) scale(1)',
    },
  },
})
