import React from 'react'
import { keyframes } from '@emotion/core'

import { Box, BoxProps } from '../Box'

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
 *  return loading ? <Skeleton height={24} /> : <h1>{data}</h1>
 * }
 *
 */
export function Skeleton(props: SkeletonProps) {
  const {
    width = '100%',
    height = '100%',
    circle = false,
    sx = {},
    ...boxProps
  } = props
  return (
    <Box
      {...boxProps}
      sx={{
        backgroundColor: 'muted.4',
        backgroundImage: (theme) => `linear-gradient(
          90deg,
          ${theme.colors.muted[4]},
          white,
          ${theme.colors.muted[4]}
        )`,
        backgroundSize: `200px 100%`,
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        lineHeight: 1,
        width,
        height,
        borderRadius: circle ? '50%' : 4,
        animation: `${load} 1.2s ease-in-out infinite`,
        ...sx,
      }}
    />
  )
}

export interface SkeletonProps extends BoxProps {
  /**
   * Width of the element
   * @default 100%
   */
  width?: string | number
  /**
   * Height of the element
   * @default 100%
   */
  height?: string | number
  /**
   * If is a circle or not
   * @default false
   */
  circle?: boolean
}
