import type { Ref } from 'react'
import { useRef } from 'react'
import { queueMicrotask } from '@vtex/admin-ui-util'

/**
 * Focus on an element on click its container
 * @example
 * const [ref, ensureFocus] = useFieldFocus()
 *
 * <div onClick={ensureFocus}>
 *  <input ref={ref} />
 * </div>
 */
export function useFieldFocus<E extends HTMLElement>(): [Ref<E>, VoidFunction] {
  const ref = useRef<E>(null)

  const ensureFocus = () => {
    if (ref.current) {
      queueMicrotask(() => {
        ref?.current?.focus()
      })
    }
  }

  return [ref, ensureFocus]
}
