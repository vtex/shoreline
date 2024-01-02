import type { ReactNode, Ref } from 'react'
import React from 'react'
import type { VirtualItem as VirtualItemType } from '@tanstack/react-virtual'
import { forwardRef, isFunction } from '@vtex/shoreline-utils'

import { Compose } from '../compose'

export const VirtualItem = forwardRef(function VirtualItem(
  props: VirtualItemsProps,
  ref: Ref<any>
) {
  const {
    index = 0,
    start = 0,
    end,
    size = 0,
    lane,
    children,
    asChild = false,
    style: defaultStyle,
    dynamic = false,
    ...otherProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      ref={ref}
      key={index}
      data-index={index}
      style={
        {
          '--sl-virtual-item-size': `${size}px`,
          '--sl-virtual-item-start': `${start}px`,
          ...defaultStyle,
        } as any
      }
      data-sl-virtual-item
      data-sl-virtual-dynamic={dynamic}
      {...otherProps}
    >
      {isFunction(children) ? children({ index }) : children}
    </Comp>
  )
})

export interface VirtualItemsProps extends Partial<VirtualItemType> {
  children?:
    | ReactNode
    | ((props: Required<Pick<VirtualItemsProps, 'index'>>) => ReactNode)
  style?: React.CSSProperties
  asChild?: boolean
  dynamic?: boolean
}
