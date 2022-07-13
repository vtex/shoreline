import { style, styleVariants } from '@vtex/admin-ui-core'

export * from './table-row.styles'

export const variants = styleVariants({
  clickable: {
    true: {
      cursor: 'pointer',
      ':hover': {
        bg: '$action.neutral.tertiaryHover',
      },
    },
    false: {},
  },
  selected: {
    true: {
      bg: '$action.main.tertiarySelected',
    },
    false: {
      bg: '$primary',
    },
  },
})
