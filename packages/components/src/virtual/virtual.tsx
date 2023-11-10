import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React from 'react'

import { Compose } from '../compose'
import type { UseVirtualizerModelReturn } from './useVirtualizerModel'

export function Virtual(props: VirtualProps) {
  const {
    virtualizer,
    children,
    asChild,
    style: defaultStyle,
    ...otherProps
  } = props

  const { ref, totalSize } = virtualizer

  const Comp = asChild ? Compose : 'div'

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

export interface VirtualProps extends ComponentPropsWithoutRef<'div'> {
  virtualizer: UseVirtualizerModelReturn
  asChild?: boolean
  children: ReactNode
}
