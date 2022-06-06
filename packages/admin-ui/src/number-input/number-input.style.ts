import { style } from '@vtex/admin-ui-core'

export const container = style({
  ':not(:hover):not(:focus-within) > button': {
    display: 'none',
  },
})

export const input = style({
  appearance: 'none',
  '-moz-appearance': 'textfield',
  '::-webkit-inner-spin-button ': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  '::placeholder': {
    fontStyle: 'italic',
  },

  ':disabled ~ button': {
    display: 'none',
  },
})

export const spinButton = style({
  marginTop: '$m',
  marginBottom: '$m',
})

export const incrementButton = style({
  marginRight: '$s',
  ...spinButton,
})
