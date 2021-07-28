import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { BoxProps } from '@vtex/admin-primitives'
import { Box } from '@vtex/admin-primitives'

import type { SystemComponentProps } from '../../types'

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
