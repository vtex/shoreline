import type { ReactNode } from 'react'
import React from 'react'

import { Compose } from '../compose'
import type { UseVirtualizerModelReturn } from './useVirtualizerModel'

export function Virtual<T>(props: VirtualProps<T>) {
  const { virtualizer, children, asChild, ...otherProps } = props

  const { ref, totalSize } = virtualizer

  const Comp = asChild ? Compose : 'div'

  return (
    <div
      data-sl-virtual
      style={
        {
          height: '500px',
          overflow: 'auto',
          width: '100%',
          contain: 'strict',
          '--sl-virtual-total-size': `${totalSize}px`,
        } as any
      }
    >
      <Comp
        ref={ref}
        style={{
          height: 'var(--sl-virtual-total-size)',
          position: 'relative',
        }}
        {...otherProps}
      >
        {children}
      </Comp>
    </div>
  )
}

export type VirtualProps<T> = {
  virtualizer: UseVirtualizerModelReturn<T>
  asChild?: boolean
  children: ReactNode
}
