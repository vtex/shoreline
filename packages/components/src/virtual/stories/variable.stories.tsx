import '../../../dist/styles.min.css'
import React, { Fragment, useMemo } from 'react'
import '../virtual.css'

import {
  Virtual,
  VirtualContainer,
  VirtualItem,
  useVirtualizerModel,
} from '../index'

import './styles.css'
import { Center } from '../../center'

export default {
  title: 'shoreline-components/virtual',
}

export function Dynamic() {
  const virtualizer = useVirtualizerModel({
    count: 5000,
    dynamic: true,
  })

  return (
    <Virtual virtualizer={virtualizer} style={{ width: 500 }}>
      <VirtualContainer virtualizer={virtualizer}>
        <VirtualItem asChild>
          {({ index }) => {
            return (
              <Center
                className="row"
                data-odd={index % 2 !== 0}
                style={{
                  height: index % 2 === 0 ? '40px' : '60px',
                }}
              >
                Item {index}
              </Center>
            )
          }}
        </VirtualItem>
      </VirtualContainer>
    </Virtual>
  )
}
