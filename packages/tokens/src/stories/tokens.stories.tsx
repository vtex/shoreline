import React from 'react'

import { ShorelineTokens } from '../tokens'

export default {
  title: 'tokens/token-object',
}

export function Default() {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: ShorelineTokens.ColorBlue13,
        borderRadius: ShorelineTokens.BorderRadiusMedium,
      }}
    />
  )
}
