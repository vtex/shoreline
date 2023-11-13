import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

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

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Skeleton shape
   * @default rect
   */
  shape?: 'circle' | 'rect'
}
