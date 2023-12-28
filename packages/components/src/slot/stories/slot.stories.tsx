import React from 'react'

import { Slot } from '../index'

export default {
  title: 'latyouts/slot',
}

export function Default() {
  return <Slot>Slot</Slot>
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
