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
    start,
    end,
    size,
    lane,
    children,
    style,
    key,
    asChild = false,
    ...otherProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      ref={ref}
      data-index={index}
      key={key}
      style={
        {
          '--sl-virtual-item-start': `${start}px`,
          ...style,
        } as any
      }
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
}
