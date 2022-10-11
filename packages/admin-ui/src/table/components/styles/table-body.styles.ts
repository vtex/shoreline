import { style, styleVariants } from '@vtex/admin-ui-core'

export * from './table-row.styles'

export const baseline = style({
  display: 'contents',
})

export const variants = styleVariants({
  clickable: {
    true: {
      cursor: 'pointer',
      ':hover': {
        '.__admin-ui-fixed-cell': {
          bg: '$primary',

          '> div': {
            bg: '$action.neutral.tertiaryHover',
          },
        },

        'td[role=cell]:not(.__admin-ui-fixed-cell)': {
          bg: '$action.neutral.tertiaryHover',
        },
      },
    },
    false: {},
  },
  selected: {
    true: {
      'td[role=cell]': {
        bg: '$action.main.tertiarySelected',
      },
    },
    false: {
      'td[role=cell]': {
        bg: '$primary',
      },
    },
  },
})
