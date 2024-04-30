import React from 'react'

import { DatePicker } from '../index'

export default {
  title: 'components/date-picker',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return <DatePicker />
}
