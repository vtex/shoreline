import { csx } from '@vtex/admin-ui-core'

export const anchorTheme = csx({
  font: 'inherit',
  color: '$action.main.tertiary',
  textDecoration: 'none',
  cursor: 'pointer',
  ':visited': {
    color: '$action.main.tertiaryPressed',
  },
  ':hover': {
    color: '$action.main.tertiaryHover',
    textDecoration: 'underline',
  },
})
