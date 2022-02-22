import { style } from '@vtex/admin-ui-core'

import * as buttonStyle from '../components/Button/Button.style'

export const datePicker = style({
  padding: '$s',
  height: 52,
  width: 288,
  border: '$neutral',
  borderRadius: 4,
})

export const datePickerLabel = style({
  text: '$detail',
  color: '$secondary',
})

export const datePickerDisclosure = style({
  ...buttonStyle.baseline,
  ...buttonStyle.action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  ...buttonStyle.small({
    icon: 'only',
  }),
})
