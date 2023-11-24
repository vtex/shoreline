import React from 'react'
import '../virtual.css'

import { Virtual, VirtualItem } from '../index'

export default {
  title: 'shoreline-components/virtual',
}

export function Default() {
  return (
    <Virtual count={5000} estimateSize={() => 40} style={{ width: 200 }}>
      <VirtualItem>Virtualized item</VirtualItem>
    </Virtual>
  )
}
