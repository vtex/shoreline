import { csx, dataAttr } from '@vtex/admin-ui-core'

export const tableBodyTheme = csx({
  display: 'contents',
})

export const tableBodyRowTheme = csx({
  display: 'contents',
  [dataAttr('clickable', 'true')]: {
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
  [dataAttr('selected', 'true')]: {
    'td[role=cell]': {
      bg: '$action.main.tertiarySelected',
    },
  },
  [dataAttr('selected', 'false')]: {
    'td[role=cell]': {
      bg: '$primary',
    },
  },
})
