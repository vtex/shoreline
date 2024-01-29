import React from 'react'

import { Calendar } from '../index'

export default {
  title: 'date/calendar',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return <Calendar />
}
