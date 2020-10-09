import React from 'react'
import { SxStyleProp } from 'theme-ui'
import { LayoutTokensProps, SpaceTokensProps } from 'admin-system'

import { Box } from '../Box'

/**
 * Represents a UI that doesn’t contain actual content; instead, it shows the loading elements of a page in a shape similar to actual content.
 * It show users that content is loading, offering a vague preview of how content will look once it fully loads.
 * It's beeing used internally by AdminUI to handle the loading state of specyfic components.
 * @returns A styled & full-feature theme-ui/Box component
 * @example
 * import { Skeleton } from 'admin-ui'
 *
 * const useFetch; ** hook that fetches content **
 *
 * function Component() {
 *  const { loading, data } = useFetch()
 *  return loading ? <Skeleton sx={{ ... }} /> : <h1>{data}</h1>
 * }
 *
 */
export function Skeleton(props: SkeletonProps) {
  const { sx = {}, shape = 'rect', ...boxProps } = props
  const variant =
    shape === 'circle' ? 'layout.skeleton-circle' : 'layout.skeleton'

  return <Box {...boxProps} variant={variant} sx={sx} />
}

export type Shape = 'rect' | 'circle'

export interface SkeletonProps
  extends Pick<
      LayoutTokensProps,
      'w' | 'h' | 'maxH' | 'minH' | 'maxW' | 'minW'
    >,
    Pick<SpaceTokensProps, 'm' | 'mt' | 'mb' | 'ml' | 'mr' | 'mx' | 'my'> {
  /**
   * Shape of the skeleton
   * @default 'rect'
   */
  shape?: Shape
  /**
   * Custom styles
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Element type
   * @default div
   */
  el?: React.ElementType
}
