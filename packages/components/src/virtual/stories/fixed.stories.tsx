import '../../../dist/styles.min.css'
import React, { Fragment, useMemo } from 'react'
import '../virtual.css'
import './styles.css'

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

export function Fixed() {
  const model = useVirtualizerModel({
    count: 5000,
    estimateSize() {
      return 60
    },
    overscan: 5,
  })

  return (
    <Virtual
      virtualizer={model}
      style={{
        height: `500px`,
        width: `400px`,
        overflow: 'auto',
      }}
    >
      <VirtualContainer virtualizer={model}>
        <VirtualItem asChild>
          {({ index }) => {
            return (
              <Center className="row" data-odd={index % 2 !== 0}>
                Item {index}
              </Center>
            )
          }}
        </VirtualItem>
      </VirtualContainer>
    </Virtual>
  )
}
