import React from 'react'

import { Clickable, ClickableBubble } from '../index'

export default {
  title: 'primitives/clickable/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function ClickBubble() {
  return (
    <Clickable onClick={() => alert('Parent click')}>
      <ClickableBubble>
        <p>Click the text will bubble the click event to the parent</p>
      </ClickableBubble>
      <button onClick={() => alert('Child click')}>Child</button>
    </Clickable>
  )
}
