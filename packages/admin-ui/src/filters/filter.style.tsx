import { focusVisible, style } from '@vtex/admin-ui-core'

import * as buttonStyle from '../button/button.style'

export const disclosure = style({
  ...buttonStyle.buttonStyle,
  ...buttonStyle.variants({ size: 'normal' }),
  marginRight: '$s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  text: '$action2',
  bg: '$action.neutral.secondary',
  color: '$secondary',
  padding: '$s',
  ':hover': {
    bg: '$action.neutral.secondaryHover',
    color: '$secondary',
  },
  ':active': {
    bg: '$action.neutral.secondaryPressed',
    color: '$secondary',
  },
  svg: {
    marginLeft: '$xs',
  },
})

export const caretIcon = (isOpen: boolean) =>
  style({
    transform: `rotate(${isOpen ? 0 : 180}deg)`,
    marginLeft: '$s',
  })

export const option = style({
  display: 'flex',
  cursor: 'pointer',
  ...focusVisible('main'),
})

export const scrollableContainer = style({
  marginTop: '$m',
  padding: '$l',
  maxHeight: 312,
  overflowY: 'auto',
})

export const disclosureStatusLabel = style({
  color: '$primary',
  marginLeft: '$s',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  maxWidth: '300px',
})
