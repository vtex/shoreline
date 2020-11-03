import { ElementType } from 'react'
import { SxStyleProp, useClassName } from '@vtex/admin-ui-system'
import { SpaceStyleProps, SizeStyleProps } from '@vtex/admin-ui-theme'
import { Box as ReakitBox } from 'reakit/Box'

import { createElement } from '../../system'

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
  const htmlProps = useSkeleton(restProps)

  return createElement({
    component: ReakitBox,
    htmlProps,
    element,
  })
}

/**
 * Skeleton lower level api
 * @returns skeleton htmlProps
 */
export function useSkeleton(props: SkeletonProps) {
  const { shape = 'rect' } = props

  const className = useClassName({
    props,
    themeKey: `components.skeleton.${shape}`,
  })

  return { ...props, className }
}

export type SkeletonShape = 'rect' | 'circle'

export interface SkeletonProps extends SpaceStyleProps, SizeStyleProps {
  /**
   * Aditional styles
   * @default {}
   */
  styles?: SxStyleProp
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
