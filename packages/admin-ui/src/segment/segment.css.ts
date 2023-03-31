import { csx, dataAttr } from '@vtex/admin-ui-core'

export const segmentListTheme = csx({
  display: 'flex',
})

export const segmentTheme = csx({
  cursor: 'pointer',
  text: '$body',
  paddingY: '$space-0',
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  ':disabled': {
    color: '$disabled',
  },
  [dataAttr('literal', 'true')]: { paddingX: '$space-05' },
  [dataAttr('literal', 'false')]: {
    paddingX: '$space-1',
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
})
