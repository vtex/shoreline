import { style } from '@vtex/admin-ui-core'

export const container = style({
  ':not(:hover) > button': {
    display: 'none',
  },
})

export const input = style({
  '::-webkit-inner-spin-button ': {
    WebkitAppearance: 'none',
    margin: 0,
  },
})

export const spinButton = style({
  marginTop: '$s',
  marginBottom: '$s',
})

export const incrementButton = style({
  marginRight: '$xs',
  ...spinButton,
})
