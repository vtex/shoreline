import { style, styleVariants } from '@vtex/admin-ui-core'

export const segmentList = style({
  display: 'flex',
})

export const segment = style({
  cursor: 'pointer',
  text: '$body',
  paddingY: 0,
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  ':disabled': {
    color: '$disabled',
  },
})

export const segmentVariants = styleVariants({
  literal: {
    true: {
      paddingX: '$xs',
    },
    false: {
      paddingX: '$s',
      ':hover': {
        bg: '$action.neutral.tertiaryHover',
        color: '$action.neutral.tertiaryHover',
      },
      ':active': {
        bg: '$action.neutral.tertiaryPressed',
        color: '$action.neutral.tertiaryPressed',
      },
      ':focus': {
        bg: '$action.neutral.tertiaryHover',
        color: '$action.netural.tertiaryHover',
        outline: 'none',
      },
    },
  },
})
