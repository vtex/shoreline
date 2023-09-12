import { csx } from '@vtex/admin-ui-core'

export const numberInputContainerTheme = csx({
  opacity: 1,
  ':not(:hover):not(:focus-within) > button': {
    opacity: 0,
    transition: 'opacity 250ms ease-in-out',
  },
})

export const numberInputTheme = csx({
  appearance: 'none',
  '-moz-appearance': 'textfield',
  '::-webkit-inner-spin-button ': {
    WebkitAppearance: 'none',
    margin: '$space-0',
  },

  '::placeholder': {
    fontStyle: 'italic',
  },

  ':disabled ~ button': {
    display: 'none',
  },
})

export const spinButtonTheme = csx({
  marginTop: '$space-1',
  marginBottom: '$space-1',
})

export const incrementButtonTheme = csx({
  marginRight: '$space-1',
  marginTop: '$space-1',
  marginBottom: '$space-1',
})
