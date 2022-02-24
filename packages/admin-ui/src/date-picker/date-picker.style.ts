import { focusVisible, style } from '@vtex/admin-ui-core'

export const disclosure = style({
  text: '$action1',
  border: 'none',
  borderRadius: 'default',
  cursor: 'pointer',
  position: 'relative',
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
  padding: '$narrow.s',
  height: '2.25rem',
  ...focusVisible('neutral'),
})
