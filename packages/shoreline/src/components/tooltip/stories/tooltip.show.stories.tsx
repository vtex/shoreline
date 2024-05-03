import React from 'react'

import { Tooltip } from '../index'

export default {
  title: 'components/tooltip',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show() {
  return (
    <Tooltip label="Tooltip text">
      <button>I</button>
    </Tooltip>
  )
}
