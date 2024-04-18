import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Skeletons compose a low-fidelity representation of content that will load. They appear when the entire page is loading and take up to 5s.
 * @status stable
 * @example
 * <Skeleton shape="circle" style={{ width: 200, height: 200 }} />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const { shape = 'rect', ...otherProps } = props

    return (
      <div
        data-sl-skeleton
        data-sl-skeleton-shape={shape}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface SkeletonOptions {
  /**
   * Skeleton shape
   * @default rect
   */
  shape?: 'circle' | 'rect'
}

export type SkeletonProps = SkeletonOptions & ComponentPropsWithoutRef<'div'>
