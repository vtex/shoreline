import React from 'react'
import { Flex, FlexProps } from '@vtex/admin-primitives'

export function Footer(props: FlexProps) {
  const { csx, ...restProps } = props

  return (
    <Flex
      csx={{ themeKey: 'components.filterBar.footer', ...csx }}
      {...restProps}
    />
  )
}
