import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

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

export interface FieldCharCounterOptions {
  /**
   * Current count
   */
  count: number
  /**
   * Max count
   */
  limit: number
}

export type FieldCharCounterProps = FieldCharCounterOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>
