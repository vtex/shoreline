import { useEffect, useState } from 'react'
import { useStateContext } from '../context'

export function useTableScroll() {
  const { tableRef } = useStateContext()

  const [hasVerticalScroll, setHasVerticalScroll] = useState(false)
  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false)

  // Vertical scroll
  useEffect(() => {
    if (!tableRef?.current) {
      return
    }

    const table = tableRef.current

    const onScroll = () => {
      const currentVerticalScroll = table.scrollTop > 0

      if (hasVerticalScroll !== currentVerticalScroll) {
        setHasVerticalScroll(currentVerticalScroll)
      }
    }

    table.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [hasVerticalScroll])

  // Horizontal scroll
  useEffect(() => {
    if (!tableRef?.current) {
      return
    }

    const table = tableRef.current

    const onScroll = () => {
      const currentHorizontalScroll = table.scrollLeft > 0

      if (hasHorizontalScroll !== currentHorizontalScroll) {
        setHasHorizontalScroll(currentHorizontalScroll)
      }
    }

    table.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [hasHorizontalScroll])

  return {
    hasVerticalScroll,
    hasHorizontalScroll,
  }
}
