import '../../../dist/styles.min.css'
import React, { useMemo } from 'react'
import '../virtual.css'

import {
  Virtual,
  VirtualContainer,
  VirtualItem,
  useVirtualizerModel,
} from '../index'

import { Checkbox } from '../../checkbox'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/virtual',
}

const index = 1

export function Default() {
  const virtualizer = useVirtualizerModel({ count: 1000 })

  return (
    <Virtual virtualizer={virtualizer}>
      <VirtualContainer virtualizer={virtualizer}>
        <VirtualItem>
          <Button
            variant={index % 1 === 0 ? 'critical' : 'tertiary'}
            size="large"
          >
            Test {index}
          </Button>
        </VirtualItem>
      </VirtualContainer>
    </Virtual>
  )
}
