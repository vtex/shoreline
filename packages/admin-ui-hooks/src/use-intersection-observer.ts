import { useEffect, useRef, useState } from 'react'

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export function useIntersectionObserver(
  params: IntersectionObserverInit & {
    callback: (entry: IntersectionObserverEntry) => void
  }
) {
  const {
    // Defaults to the browser viewport
    root = null,
    rootMargin = undefined,
    threshold = 0,
    callback,
  } = params
  const [node, setNode] = useState<HTMLDivElement>()
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (!node) {
      return
    }

    observer.current = new IntersectionObserver(
      ([entry]) => {
        callback(entry)
      },
      {
        root,
        rootMargin,
        threshold,
      }
    )

    const { current: currentObserver } = observer

    currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node, root, rootMargin, threshold, callback])

  return { setNode }
}
