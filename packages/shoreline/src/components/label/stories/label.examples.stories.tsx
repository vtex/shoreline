import React from 'react'

import { Label } from '../index'
import { LocaleProvider } from '../../locale'

export default {
  title: 'components/label/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Localization() {
  return (
    <LocaleProvider locale="ja-JP">
      <Label optional>Label</Label>
    </LocaleProvider>
  )
}
