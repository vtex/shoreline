import React from 'react'
import * as CSS from 'csstype'
import { ResponsiveValue, omit, pick } from '@vtex/admin-ui-system'

import { Box, BoxProps } from '../Box'

const propertyMap = {
  basis: 'flexBasis',
  direction: 'flexDirection',
  wrap: 'flexWrap',
  align: 'alignItems',
  justify: 'justifyContent',
  grow: 'flexGrow',
  shrink: 'flexShrink',
  order: 'order',
}

export function Flex(props: FlexProps) {
  const { styles, ...boxProps } = props
  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, pick(boxProps, cssProps))

  return (
    <Box
      styles={{
        display: 'flex',
        ...cssPropsStyle,
        ...styles,
      }}
      {...omit(boxProps, cssProps)}
    />
  )
}

Flex.Spacer = function Spacer() {
  return (
    <Box
      styles={{
        flex: 1,
        justifySelf: 'stretch',
        alignSelf: 'stretch',
      }}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renameKeys(keysMap: { [x: string]: any }, obj: { [x: string]: any }) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
}

export interface FlexProps extends BoxProps<'div'> {
  align?: ResponsiveValue<CSS.Property.AlignContent>
  basis?: ResponsiveValue<CSS.Property.FlexBasis>
  direction?: ResponsiveValue<CSS.Property.FlexDirection>
  grow?: ResponsiveValue<CSS.Property.FlexGrow>
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>
  justify?: ResponsiveValue<CSS.Property.JustifyContent>
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>
  order?: ResponsiveValue<CSS.Property.Order>
}
