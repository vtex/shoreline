import '../../../dist/styles.min.css'
import React from 'react'

import { Action } from '../index'

export default {
  title: 'shoreline-components/action',
}

export function Default() {
  return <Action>Label</Action>
}

export function Compose() {
  return (
    <Action asChild>
      <a href="https://vtex.com" target="_blank" rel="noreferrer">
        Label
      </a>
    </Action>
  )
}
