import { focusVisible, csx, dataAttr } from '@vtex/admin-ui-core'

export const datePickerDisclosureTheme = csx({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
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
  padding: '$space-1 $space-3',
  height: '2.25rem',
  ...focusVisible('neutral'),

  [dataAttr('disabled', 'true')]: { fg: 'blue' },
  [dataAttr('disabled', 'false')]: {
    fg: '$action.neutral.tertiary',
  },
})
