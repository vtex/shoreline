import React from 'react'

import { Calendar } from '../index'

export default {
  title: 'components/calendar',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return <Calendar />
}
