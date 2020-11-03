import React, { Ref, forwardRef } from 'react'

import { Overridable } from '../../types'
import { Box, BoxProps } from '../Box'

export const Card = forwardRef(function Card(
  props: CardProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    styleOverrides,
    palette = 'base',
    border = 'default',
    padding = 6,
    ...boxProps
  } = props

  return (
    <Box
      ref={ref}
      styles={styleOverrides}
      palette={palette}
      border={border}
      padding={padding}
      {...boxProps}
    />
  )
})

export type CardProps = Overridable & Omit<BoxProps, 'styles'>
