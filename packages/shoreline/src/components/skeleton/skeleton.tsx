import { type CSSProperty, style } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

/**
 * Skeletons compose a low-fidelity representation of content that will load. They appear when the entire page is loading and take up to 5s.
 * @status stable
 * @example
 * <Skeleton shape="circle" style={{ width: 200, height: 200 }} />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const {
      shape = 'rect',
      width = '100%',
      height = '100%',
      style: styleObject = {},
      ...otherProps
    } = props

    return (
      <div
        data-sl-skeleton
        data-sl-skeleton-shape={shape}
        ref={ref}
        style={style({
          '--sl-skeleton-width': width,
          '--sl-skeleton-height': height,
          ...styleObject,
        })}
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
  /**
   * CSS width
   * @default '100%'
   */
  width?: CSSProperty.Width
  /**
   * CSS height
   * @default '100%'
   */
  height?: CSSProperty.Height
}

export type SkeletonProps = SkeletonOptions & ComponentPropsWithoutRef<'div'>
