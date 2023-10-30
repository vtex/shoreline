import '../../../dist/styles.min.css'
import '../clickable.css'
import React from 'react'

import { Clickable, ClickableBubble } from '../index'

export default {
  title: 'shoreline-components/clickable',
}

export function Default() {
  return (
    <Clickable onClick={() => alert('Parent click')}>
      <ClickableBubble>
        <p>Select me will NOT trigger clicks</p>
      </ClickableBubble>
      <button onClick={() => alert('Child click')}>Child</button>
    </Clickable>
  )
}

export function NoTextSelection() {
  return (
    <Clickable onClick={() => alert('Parent click')}>
      <p>Not selectable text</p>
      <button onClick={() => alert('Child click')}>Child</button>
    </Clickable>
  )
}
