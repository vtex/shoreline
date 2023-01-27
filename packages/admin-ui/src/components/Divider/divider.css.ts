import { csx } from '@vtex/admin-ui-core'
import { variant } from '../../modal/util'

export const dividerTheme = csx({
  border: '$neutral',
  margin: '$space-0',
  ...variant('orientation', 'horizontal', {
    borderBottom: 0,
  }),
  ...variant('orientation', 'vertical', {
    borderLeft: 0,
    height: 'auto',
  }),
})
