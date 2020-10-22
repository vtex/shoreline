import React, { Ref, forwardRef } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { Overridable } from '../../types'
import { unstableBox as Box, BoxProps } from '../unstableBox'

export const unstableCard = forwardRef(function Card(
  props: CardProps,
  ref: Ref<HTMLDivElement>
) {
  const { styleOverrides, ...boxProps } = props

  useClassName

  return (
    <Box
      ref={ref}
      styles={{ padding: 6, ...styleOverrides }}
      palette="base"
      border="default"
      {...boxProps}
    />
  )
})

export type CardProps = Overridable & Omit<BoxProps, 'styles'>
