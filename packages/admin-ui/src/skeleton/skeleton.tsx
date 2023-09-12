import { cx } from '@vtex/admin-ui-core'
import type { Ref, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { skeletonTheme } from './skeleton.style'

/**
 * Represents a UI that doesn’t contain actual content; instead, it shows the loading elements of a page in a shape similar to actual content.
 * It show users that content is loading, offering a vague preview of how content will look once it fully loads.
 * It's beeing used internally by AdminUI to handle the loading state of specyfic components.
 * @example
 * import { Skeleton } from 'admin-ui'
 *
 * const useFetch; ** hook that fetches content **
 *
 * function Component() {
 *  const { loading, data } = useFetch()
 *  return loading ? <Skeleton /> : <h1>{data}</h1>
 * }
 *
 */
export const Skeleton = forwardRef(function Skeleton(
  props: SkeletonProps,
  ref: Ref<HTMLDivElement>
) {
  const { shape = 'rect', className = '', ...htmlProps } = props

  return (
    <div
      ref={ref}
      data-shape={shape}
      className={cx(skeletonTheme, className)}
      {...htmlProps}
    />
  )
})

export type SkeletonShape = 'rect' | 'circle'

export type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Skeleton shape
   * @default rect
   */
  shape?: SkeletonShape
}
