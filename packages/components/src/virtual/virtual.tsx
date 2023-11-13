import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { Compose } from '../compose'
import type { UseVirtualizerModelReturn } from './useVirtualizerModel'
import { forwardRef, useMergeRef } from '@vtex/shoreline-utils'

export const Virtual = forwardRef<HTMLDivElement, VirtualProps>(
  function Virtual(props, forwardedRef) {
    const {
      virtualizer,
      children,
      asChild,
      style: defaultStyle,
      ...otherProps
    } = props

    const { ref: virtualizerRef, totalSize } = virtualizer

    const Comp = asChild ? Compose : 'div'

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
        <Comp data-sl-virtual-compose>{children}</Comp>
      </div>
    )
  }
)

export interface VirtualProps extends ComponentPropsWithoutRef<'div'> {
  virtualizer: UseVirtualizerModelReturn
  asChild?: boolean
}
