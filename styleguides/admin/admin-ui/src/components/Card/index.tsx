import React, { Ref, forwardRef } from 'react'

import { Overridable } from '../../types'
import { Box, BoxProps } from '../Box'

export const Card = forwardRef(function Card(
  props: CardProps,
  ref: Ref<HTMLDivElement>
) {
  const { styleOverrides, ...boxProps } = props

  return (
    <Box
      ref={ref}
      styles={{
        bg: 'background',
        color: 'text.primary',
        border: 'default',
        padding: 6,
        ...styleOverrides,
      }}
      {...boxProps}
    />
  )
})

export type CardProps = Overridable & Omit<BoxProps<'div'>, 'styles'>
