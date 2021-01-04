import { ElementType } from 'react'
import { StyleProp, useClassName } from '@vtex/admin-ui-system'
import { Box as ReakitBox } from 'reakit/Box'

import { jsxs } from '../../system'

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
 *  return loading ? <Skeleton styles={{ ... }} /> : <h1>{data}</h1>
 * }
 *
 */
export function Skeleton(props: SkeletonProps) {
  const { element = 'div', ...restProps } = props
  const skeletonProps = useSkeleton(restProps)

  return jsxs({
    component: ReakitBox,
    props: skeletonProps,
    element,
  })
}

/**
 * Skeleton lower level api
 * @returns skeleton htmlProps
 */
export function useSkeleton(props: SkeletonProps) {
  const { shape = 'rect', styles, ...htmlProps } = props

  const className = useClassName({
    ...styles,
    themeKey: `components.skeleton.${shape}`,
  })

  return { ...htmlProps, className }
}

export type SkeletonShape = 'rect' | 'circle'

export interface SkeletonProps {
  /**
   * Aditional styles
   * @default {}
   */
  styles?: StyleProp
  /**
   * Shape of the skeleton
   * @default 'rect'
   */
  shape?: SkeletonShape
  /**
   * Element type
   * @default div
   */
  element?: ElementType
}
