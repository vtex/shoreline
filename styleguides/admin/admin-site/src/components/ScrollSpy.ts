import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import constate from 'constate'

import useLocation from '../hooks/useLocation'

function useCollection() {
  const [items, setItems] = useState<string[]>([])
  const add = useCallback((item: string) => {
    setItems((prevItems) => [...prevItems, item])
  }, [])

  const remove = useCallback((item: string) => {
    setItems((prevItems) => {
      const idx = prevItems.indexOf(item)

      return [...prevItems.slice(0, idx), ...prevItems.slice(idx + 1)]
    })
  }, [])

  return {
    items,
    add,
    remove,
  }
}

const [CollectionProvider, useCollectionContext] = constate(() => {
  const value = useCollection()

  return useMemo(() => value, [value])
})

function useScrollSpy() {
  const { items } = useCollectionContext()
  const [currentId, setCurrentId] = useState<string | null>(null)
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentId(null)
  }, [location.pathname])

  const handleScroll = useCallback(() => {
    if (!items.length) return undefined

    const elements = document.querySelectorAll<HTMLElement>(
      items.map((item) => `[id="${item}"]`).join(',')
    )

    const elementsArray = Array.from(elements)

    elementsArray.forEach((element) => {
      if (ref.current) {
        const { scrollTop = 0 } = ref.current

        if (element.offsetTop <= scrollTop + 256) {
          setCurrentId(element.id)
        }
      }
    })
  }, [items])

  return { currentId, handleScroll, ref }
}

const [ScrollSpyProvider, useScrollSpyContext] = constate(useScrollSpy)

function ScrollHandler({
  children,
}: {
  children: (context: ReturnType<typeof useScrollSpyContext>) => JSX.Element
}) {
  const context = useScrollSpyContext()

  return children(context)
}

export {
  ScrollHandler,
  ScrollSpyProvider,
  useScrollSpyContext,
  CollectionProvider,
  useCollectionContext,
}
