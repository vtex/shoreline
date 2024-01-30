import React from 'react'
import { Bleed } from '../index'

export default {
  title: 'layouts/bleed',
}

export function Show() {
  return (
    <div style={{ padding: '1rem' }}>
      <Bleed start="0.5rem" end="1rem">
        <button>Button</button>
      </Bleed>
    </div>
  )
}
