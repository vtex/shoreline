import { csx } from '@vtex/admin-ui-core'

export const topbarTheme = csx({
  display: 'grid',
  padding: '$space-3',
  gridTemplateColumns: '1fr 1fr',
  '@desktop': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
})
