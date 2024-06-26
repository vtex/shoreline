import type { MutableRefObject, Ref, RefCallback } from 'react'
import { useMemo } from 'react'

/**
 * Sets both a function and object React ref.
 */
function setRef<T>(
  ref: RefCallback<T> | MutableRefObject<T> | null | undefined,
  value: T
) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

/**
 * Merges React Refs into a single memoized function ref so you can pass it to
 * an element.
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRef(internalRef, ref)} />;
 * });
 */
export function useMergeRef(...refs: Array<Ref<any> | undefined>) {
  return useMemo(() => {
    if (!refs.some(Boolean)) return

    return (value: any) => {
      refs.forEach((ref) => {
        setRef(ref, value)
      })
    }
  }, refs)
}
