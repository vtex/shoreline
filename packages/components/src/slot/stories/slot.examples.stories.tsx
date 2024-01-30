import React from 'react'

import { Slot } from '../index'

export default {
  title: 'layouts/slot/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function AsChild() {
  return (
    <Slot asChild>
      <a href="https://vte.com" target="_blank" rel="noreferrer">
        Go to VTEX
      </a>
    </Slot>
  )
}
