import { style, styleVariants } from '@vtex/admin-ui-core'

export const tableRowBaseline = style({
  display: 'table-row',
  bg: '$primary',
  textAlign: 'left',
})

export const tbodyBaseline = style({ display: 'table-row-group' })

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
