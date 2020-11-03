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
    ...boxProps
  } = props

  return (
    <Box
      ref={ref}
      styles={{ padding: 6, ...styleOverrides }}
      palette={palette}
      border={border}
      {...boxProps}
    />
  )
})

export type CardProps = Overridable & Omit<BoxProps, 'styles'>
