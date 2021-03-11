import { ElementType } from 'react'
import { useSystem, createComponent } from '@vtex/admin-core'

import { Primitive } from '@vtex/admin-primitives'
import { SystemPrimitive } from '../../types'

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
export const Skeleton = createComponent(Primitive, useSkeleton)

/**
 * Skeleton lower level api
 * @returns skeleton htmlProps
 */
export function useSkeleton(props: SkeletonProps) {
  const { shape = 'rect', styles = {}, element = 'div', ...htmlProps } = props
  const { keyframes } = useSystem()

  const load = keyframes`
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  `

  return {
    element,
    csx: {
      themeKey: {
        skeleton: { shape },
      },
      animation: `${load} 1.2s ease-in-out infinite`,
      ...styles,
    },
    ...htmlProps,
  }
}

export type SkeletonShape = 'rect' | 'circle'

export interface SkeletonProps extends SystemPrimitive {
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
