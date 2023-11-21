import React from 'react'

import { Bleed } from '../index'

export default {
  title: 'shoreline-components/bleed',
}

export function Default() {
  return (
    <div style={{ padding: '1rem' }}>
      <Bleed horizontal="1rem" vertical="0.5rem">
        <button>Button</button>
      </Bleed>
    </div>
  )
}
