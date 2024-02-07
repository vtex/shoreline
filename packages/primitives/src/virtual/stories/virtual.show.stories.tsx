import React from 'react'

import { Virtual, VirtualItem } from '../index'

export default {
  title: 'primitives/virtual',
}

export function Show() {
  return (
    <Virtual count={5000} estimateSize={() => 40} style={{ width: 200 }}>
      <VirtualItem>Virtualized item</VirtualItem>
    </Virtual>
  )
}
