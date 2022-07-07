import type { ComponentPropsWithRef } from 'react'
import type * as CSS from 'csstype'
import { pick, renameKeys } from '@vtex/admin-ui-util'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import {
  createHook,
  createComponent,
  getResponsiveValue,
  useBreakpoint,
  useElement,
} from '@vtex/admin-ui-react'

export const Flex = createComponent<'div', FlexOptions>((props) => {
  const elementProps = useFlex(props)

  return useElement('div', elementProps)
})

export const useFlex = createHook<'div', FlexOptions>((props) => {
  const {
    basis,
    direction,
    wrap,
    align,
    justify,
    grow,
    shrink,
    order,
    ...restProps
  } = props

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

  const { breakpoint } = useBreakpoint()

  const responsiveValues = {
    basis: getResponsiveValue(basis, breakpoint),
    direction: getResponsiveValue(direction, breakpoint),
    wrap: getResponsiveValue(wrap, breakpoint),
    align: getResponsiveValue(align, breakpoint),
    justify: getResponsiveValue(justify, breakpoint),
    grow: getResponsiveValue(grow, breakpoint),
    shrink: getResponsiveValue(shrink, breakpoint),
    order: getResponsiveValue(order, breakpoint),
  }

  const cssProps = Object.keys(propertyMap)

  const cssPropsStyle = renameKeys(
    propertyMap,
    pick(responsiveValues, cssProps)
  )

  return { baseStyle: { display: 'flex', ...cssPropsStyle }, ...restProps }
})

export interface FlexOptions {
  /** Shorthand for CSS alignItems property */
  align?: ResponsiveProp<CSS.Property.AlignContent>
  /** Shorthand for CSS flexBasis property */
  basis?: ResponsiveProp<CSS.Property.FlexBasis>
  /** Shorthand for CSS flexDirection property */
  direction?: ResponsiveProp<CSS.Property.FlexDirection>
  /** Shorthand for CSS flexGrow property */
  grow?: ResponsiveProp<CSS.Property.FlexGrow>
  /** Shorthand for CSS flexShrink property */
  shrink?: ResponsiveProp<CSS.Property.FlexShrink>
  /** Shorthand for CSS justifyContent property */
  justify?: ResponsiveProp<CSS.Property.JustifyContent>
  /** Shorthand for CSS flexWrap property */
  wrap?: ResponsiveProp<CSS.Property.FlexWrap>
  /** Shorthand for CSS order property */
  order?: ResponsiveProp<CSS.Property.Order>
}

export type FlexProps = ComponentPropsWithRef<typeof Flex>
