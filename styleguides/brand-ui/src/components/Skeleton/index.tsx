import React from 'react'
import { Box, SxStyleProp } from 'theme-ui'
import { css, keyframes } from '@emotion/core'

const load =
  keyframes(`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }`)

export const Skeleton = (props: SkeletonProps) => {
  const { sx = {}, el = 'div', shape = 'rect' } = props

  return <Box {...props} css={css`animation: ${load} 1.5s ease-in-out infinite`} variant={`skeleton.${shape}`} as={el} sx={sx}></Box>
}

export type SkeletonShape = 'rect' | 'circle'

export interface SkeletonProps {
  /**
  * Aditional styles
  * @default {}
  */
  sx?: SxStyleProp
  /**
   * Shape of the skeleton
   * @default 'rect'
   */
  shape?: SkeletonShape
  /**
 * Element type
 * @default 'div'
 * */
  el?: React.ElementType
}