import React, { Ref, forwardRef } from 'react'

import { OmitNotAllowedProps, Overridable } from '../../types'
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
        bg: 'light.primary',
        color: 'dark.primary',
        border: 'default',
        padding: 6,
        ...styleOverrides,
      }}
      {...boxProps}
    />
  )
})

type CardOwnProps = Omit<BoxProps<'div'>, 'styles'>

export type CardProps = Overridable & OmitNotAllowedProps<CardOwnProps>
