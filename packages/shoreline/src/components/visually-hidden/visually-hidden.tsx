import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { VisuallyHidden as BaseVisuallyHidden } from '@ariakit/react'

/**
 * Renders an element that is visually only to screen readers
 * @example
 * <a href="#">
 *  Learn more<VisuallyHidden> about brazilian beaches</VisuallyHidden>
 * </a>
 */
export const VisuallyHidden = forwardRef<HTMLDivElement, VisuallyHiddenProps>(
  function VisuallyHidden(props, ref) {
    return <BaseVisuallyHidden {...props} ref={ref} />
  }
)

export interface VisuallyHiddenOptions {
  /**
   * Content that will be only available for a screen reader
   */
  children?: ReactNode
}

export type VisuallyHiddenProps = VisuallyHiddenOptions
