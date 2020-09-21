import React from 'react'
import { keyframes } from '@emotion/core'
import { SxStyleProp } from 'theme-ui'

import { Box } from '../Box'

const load = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

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

  return (
    <Box
      {...boxProps}
      sx={{
        variant: 'layout.skeleton',
        borderRadius: shape === 'circle' ? '100%' : 4,
        backgroundImage: (theme) => `linear-gradient(
          90deg,
          ${theme.colors.muted[4]},
          white,
          ${theme.colors.muted[4]}
        )`,
        animation: `${load} 1.2s ease-in-out infinite`,
        ...sx,
      }}
    />
  )
}

export type Shape = 'rect' | 'circle'

export interface SkeletonProps {
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
