import '../../../dist/styles.min.css'
import React, { Fragment, useMemo } from 'react'
import '../virtual.css'

import {
  Virtual,
  VirtualContainer,
  VirtualItem,
  useVirtualizerModel,
} from '../index'

import { Center } from '../../center'

export default {
  title: 'shoreline-components/virtual',
}

export function Default() {
  const virtualizer = useVirtualizerModel({
    count: 5000,
    estimateSize: () => 40,
  })

  return (
    <Virtual virtualizer={virtualizer} style={{ width: 200 }}>
      <VirtualContainer virtualizer={virtualizer}>
        <VirtualItem>Virtualized item</VirtualItem>
      </VirtualContainer>
    </Virtual>
  )
}
