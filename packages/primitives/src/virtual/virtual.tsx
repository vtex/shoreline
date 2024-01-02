import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { forwardRef, useMergeRef } from '@vtex/shoreline-utils'

import {
  useVirtualizerModel,
  type UseVirtualizerModelProps,
} from './use-virtualizer-model'
import { VirtualContainer } from './virtual-container'

export const Virtual = forwardRef<HTMLDivElement, VirtualProps>(
  function Virtual(props, forwardedRef) {
    const {
      children,
      count,
      dynamic,
      estimateSize,
      overscan,
      style: defaultStyle,
      ...otherProps
    } = props

    const virtualizer = useVirtualizerModel({
      count,
      dynamic,
      estimateSize,
      overscan,
    })

    const { ref: virtualizerRef, totalSize } = virtualizer

    const ref = useMergeRef(forwardedRef, virtualizerRef)

    return (
      <div
        data-sl-virtual
        style={
          {
            '--sl-virtual-total-size': `${totalSize}px`,
            ...defaultStyle,
          } as any
        }
        {...otherProps}
        ref={ref}
      >
        <div data-sl-virtual-compose>
          <VirtualContainer virtualizer={virtualizer}>
            {children}
          </VirtualContainer>
        </div>
      </div>
    )
  }
)

export interface VirtualProps
  extends ComponentPropsWithoutRef<'div'>,
    UseVirtualizerModelProps {}
