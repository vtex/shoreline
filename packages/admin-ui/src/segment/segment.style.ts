import { style } from '@vtex/admin-ui-core'

export const segmentList = style({
  display: 'flex',
})

export const segment = style({
  cursor: 'pointer',
  text: '$body',
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  ':hover': {
    bg: '$action.neutral.tertiaryHover',
    color: '$action.neutral.tertiaryHover',
  },
  ':active': {
    bg: '$action.neutral.tertiaryPressed',
    color: '$action.neutral.tertiaryPressed',
  },
  ':focus': {
    bg: '$action.main.primary',
    color: '$action.main.primary',
    outline: 'none',
  },
})
