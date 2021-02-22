/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ElementType, ReactElement } from 'react'
import * as CSS from 'csstype'
import { ResponsiveValue, omit, pick, createComponent } from '@vtex/admin-core'

import { Box, BoxProps } from '../Box'
import { Primitive } from '../Primitive'

/**
 * Flex default element
 */
const defaultElement = 'div'

const _Flex: <E extends ElementType = typeof defaultElement>(
  props: FlexProps<E>
) => ReactElement | null = createComponent(Primitive, useFlex)

export const Flex = Object.assign(_Flex, { Spacer: FlexSpacer })

export function FlexSpacer() {
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

export function useFlex(props: FlexProps) {
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

  const { styles, ...boxProps } = props
  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, pick(boxProps, cssProps))

  function renameKeys(
    keysMap: { [x: string]: any },
    obj: { [x: string]: any }
  ) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    )
  }

  return {
    styles: { display: 'flex', ...cssPropsStyle, ...styles },
    ...omit(boxProps, cssProps),
  }
}

export interface FlexOwnProps {
  /** Shorthand for CSS alignItems property */
  align?: ResponsiveValue<CSS.Property.AlignContent>
  /** Shorthand for CSS flexBasis property */
  basis?: ResponsiveValue<CSS.Property.FlexBasis>
  /** Shorthand for CSS flexDirection property */
  direction?: ResponsiveValue<CSS.Property.FlexDirection>
  /** Shorthand for CSS flexGrow property */
  grow?: ResponsiveValue<CSS.Property.FlexGrow>
  /** Shorthand for CSS flexShrink property */
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>
  /** Shorthand for CSS justifyContent property */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>
  /** Shorthand for CSS flexWrap property */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>
  /** Shorthand for CSS order property */
  order?: ResponsiveValue<CSS.Property.Order>
}

export type FlexProps<E extends ElementType = ElementType> = FlexOwnProps &
  BoxProps<E>
