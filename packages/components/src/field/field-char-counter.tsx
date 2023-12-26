import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import './field-char-counter.css'

/**
 * Count chars of a field that contains a input or textarea that has a max-length
 */
export const FieldCharCounter = forwardRef<
  HTMLDivElement,
  FieldCharCounterProps
>(function FieldCharCounter(props, ref) {
  const { count, limit, ...domProps } = props

  return (
    <div data-sl-field-char-counter ref={ref} {...domProps}>
      {count} / {limit}
    </div>
  )
})

export interface FieldCharCounterProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * Current count
   */
  count: number
  /**
   * Max count
   */
  limit: number
}
