import type { ReactNode, Ref } from 'react'
import React, { Fragment, useCallback, useRef } from 'react'

import type { VirtualItem } from '@tanstack/react-virtual'
import { useVirtualizer } from '@tanstack/react-virtual'
import { isFunction } from '@vtex/shoreline-utils'

const FIXED_SIZE_VALUE = 20
const FIXED_OVERSCAN_VALUE = 10

export function Virtual<T>(props: VirtualProps<T>) {
  const {
    items,
    estimateSize = () => FIXED_SIZE_VALUE,
    overscan = FIXED_OVERSCAN_VALUE,
    children,
  } = props

  const ref = useRef(null)

  const { getVirtualItems, getTotalSize } = useVirtualizer({
    getScrollElement: () => ref.current,
    count: items.length,
    estimateSize,
    overscan,
  })

  const { top, bottom } = getVirtualizerDim(getVirtualItems(), getTotalSize())

  const getItem = useCallback(
    (item: VirtualItem): T => {
      return items[item.index]
    },
    [items]
  )

  return (
    <Fragment>
      {isFunction(children)
        ? children({
            bottom,
            top,
            ref,
            getItem,
            items: getVirtualItems(),
            totalSize: getTotalSize(),
          })
        : children}
    </Fragment>
  )
}

/**
 * Return the dimensions between the first and last items
 */
function getVirtualizerDim(items: VirtualItem[], totalSize: number) {
  const firstItem = items?.[0]
  const lastItem = items?.[items.length - 1]

  const top = firstItem?.start ?? 0
  const bottom = totalSize - (lastItem?.end ?? 0)

  return { bottom, top }
}

export interface VirtualProps<T> {
  items: T[]
  estimateSize?: (index: number) => number
  overscan?: number
  children: ReactNode | ((props: VirtualChildProps<T>) => ReactNode)
}

export interface VirtualChildProps<T> {
  top: number
  bottom: number
  ref: Ref<any>
  getItem: (item: VirtualItem) => T
  items: VirtualItem[]
  totalSize: number
}
