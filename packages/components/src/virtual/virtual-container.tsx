import type { ReactNode } from 'react'
import React, { Fragment, cloneElement } from 'react'
import { forwardRef } from '@vtex/shoreline-utils'
import type { UseVirtualizerModelReturn } from './useVirtualizerModel'

export const VirtualContainer = forwardRef<
  HTMLDivElement,
  VirtualContainerProps
>(function VirtualContainer(props, ref) {
  const { children, virtualizer, ...otherProps } = props

  const { virtualItems, measure } = virtualizer

  return (
    <div
      ref={ref}
      data-sl-virtual-container
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
      }}
      {...otherProps}
    >
      {virtualItems.map((virtualRow) => (
        <Fragment key={virtualRow.index}>
          {cloneElement(children as any, {
            ...virtualRow,
            start: virtualItems[0]?.start ?? 0,
            ref: measure,
          })}
        </Fragment>
      ))}
    </div>
  )
})

export interface VirtualContainerProps {
  children: ReactNode
  virtualizer: UseVirtualizerModelReturn<any>
}
