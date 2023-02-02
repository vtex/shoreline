import { csx, dataAttr } from '@vtex/admin-ui-core'

export const dividerTheme = csx({
  border: '$neutral',
  margin: '$space-0',
  [dataAttr('orientation', 'horizontal')]: {
    borderBottom: 0,
  },
  [dataAttr('orientation', 'vertical')]: {
    borderLeft: 0,
    height: 'auto',
  },
})
