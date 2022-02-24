import { style } from '@vtex/admin-ui-core'

import * as buttonStyle from '../components/Button/Button.style'

export const disclosure = style({
  ...buttonStyle.baseline,
  ...buttonStyle.action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  ...buttonStyle.small({
    icon: 'only',
  }),
})
