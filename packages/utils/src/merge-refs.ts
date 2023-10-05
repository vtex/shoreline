import type { ForwardedRef } from 'react'

/**
 * Merges multiple refs into one. Works with either callback or object refs.
 * @example
 * const refA = useRef()
 * const refB = useRef()
 * const ref = mergeRefs(refA, refB)
 */
export function mergeRefs(
  ...refs: Array<ForwardedRef<any>>
): ForwardedRef<any> {
  if (refs.length === 1) {
    return refs[0]
  }

  return (value: any) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ref.current = value
      }
    }
  }
}
