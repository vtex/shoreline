import React from 'react'
import { Flex, FlexProps } from '@vtex/admin-primitives'

export function Footer(props: FlexProps) {
  const { csx, ...restProps } = props

  return (
    <Flex
      csx={{
        paddingY: 2,
        paddingX: 4,
        border: 'divider-top',
        justifyContent: 'space-between',
        bg: 'light.primary',
        ...csx,
      }}
      {...restProps}
    />
  )
}
