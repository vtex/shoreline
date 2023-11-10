import type { VirtualItem } from '@tanstack/react-virtual'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

const FIXED_SIZE_VALUE = 40

export function useVirtualizerModel(
  props: UseVirtualizerModelProps
): UseVirtualizerModelReturn {
  const {
    count,
    estimateSize = () => FIXED_SIZE_VALUE,
    overscan,
    dynamic = false,
  } = props

  const ref = useRef(null)

  const virtualizer = useVirtualizer({
    getScrollElement: () => ref.current,
    count,
    estimateSize,
    overscan,
  })

  const { top, bottom } = getVirtualizerDim(
    virtualizer.getVirtualItems(),
    virtualizer.getTotalSize()
  )

  return {
    virtualItems: virtualizer.getVirtualItems(),
    totalSize: virtualizer.getTotalSize(),
    count,
    measure: virtualizer.measureElement,
    ref,
    top,
    bottom,
    dynamic,
  }
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

export type UseVirtualizerModelProps = {
  count: number
  estimateSize?: (index: number) => number
  overscan?: number
  dynamic?: boolean
}

export type UseVirtualizerModelReturn = {
  virtualItems: VirtualItem[]
  count: number
  ref: React.MutableRefObject<null>
  totalSize: number
  measure: (node: Element | null) => void
  top: number
  bottom: number
  dynamic: boolean
}
