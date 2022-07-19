import { style, styleVariants } from '@vtex/admin-ui-core'

export * from './table-row.styles'

export const variants = styleVariants({
  clickable: {
    true: {
      cursor: 'pointer',
      ':hover': {
        '> div[role=cell]': {
          bg: '$action.neutral.tertiaryHover',
        },
      },
    },
    false: {},
  },
  selected: {
    true: {
      '> div[role=cell]': {
        bg: '$action.main.tertiarySelected',
      },
    },
    false: {
      '> div[role=cell]': {
        bg: '$primary',
      },
    },
  },
})
