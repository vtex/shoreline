import React, { Ref, forwardRef } from 'react'

import { SystemComponentProps } from '../../types'
import { Box, BoxProps } from '@vtex/admin-primitives'

export const Card = forwardRef(function Card(
  props: CardProps,
  ref: Ref<HTMLDivElement>
) {
  const { csx, ...boxProps } = props

  return (
    <Box
      ref={ref}
      csx={{
        bg: 'light.primary',
        color: 'dark.primary',
        border: 'default',
        padding: 6,
        ...csx,
      }}
      {...boxProps}
    />
  )
})

type CardOwnProps = BoxProps<'div'>

export type CardProps = SystemComponentProps<CardOwnProps>
