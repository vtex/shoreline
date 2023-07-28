import { csx } from '@vtex/admin-ui-core'

export const optionTheme = csx({
  '*': { text: '$title1' },
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  padding: '$space-4 0px',
  width: '100%',
  color: `action.neutral.tertiary`,
  bg: `action.neutral.tertiary`,
  ':hover': {
    color: `action.neutral.tertiaryHover`,
    bg: `action.neutral.tertiaryHover`,
  },
  ':active': {
    color: `action.neutral.tertiaryPressed`,
    bg: `action.neutral.tertiaryPressed`,
  },
  ':disabled': {
    bg: 'transparent',
    color: '$disabled',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus-visible': {
    outline: 'none',
    boxShadow: `$ring.neutral`,
  },
  ':focus-visible:not(:active)': {
    color: `action.neutral.tertiaryHover`,
    bg: `action.neutral.tertiaryHover`,
  },
})

export const optionsListTheme = csx({
  '> div > *:nth-child(n+2)': {
    borderTop: '$neutral',
  },
})

export const backdropTheme = csx({
  '[data-backdrop]': {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
})

export const modalTheme = csx({ margin: 0 })
