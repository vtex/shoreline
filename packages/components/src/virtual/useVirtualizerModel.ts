import type { VirtualItem } from '@tanstack/react-virtual'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

const FIXED_SIZE_VALUE = 20
const FIXED_OVERSCAN_VALUE = 10

export function useVirtualizerModel<T>(
  props: UseVirtualizerModelProps<T>
): UseVirtualizerModelReturn<T> {
  const {
    items = [],
    count: defaultCount,
    estimateSize = () => FIXED_SIZE_VALUE,
    overscan = FIXED_OVERSCAN_VALUE,
  } = props

  const count = defaultCount ?? items.length
  const ref = useRef(null)

  const virtualizer = useVirtualizer({
    getScrollElement: () => ref.current,
    count: count ?? items.length,
    estimateSize,
    overscan,
  })

  console.log({ count, totalSize: virtualizer.getTotalSize() })

  return {
    items,
    virtualItems: virtualizer.getVirtualItems(),
    totalSize: virtualizer.getTotalSize(),
    count,
    overscan,
    measure: virtualizer.measureElement,
    ref,
  }
}

export type UseVirtualizerModelProps<T> =
  | {
      items: T[]
      count?: number
      estimateSize?: (index: number) => number
      overscan?: number
    }
  | {
      count: number
      items?: T[]
      estimateSize?: (index: number) => number
      overscan?: number
    }

export type UseVirtualizerModelReturn<T> = {
  virtualItems: VirtualItem[]
  items: T[]
  count: number
  overscan: number
  ref: React.MutableRefObject<null>
  totalSize: number
  measure: (node: Element | null) => void
}
