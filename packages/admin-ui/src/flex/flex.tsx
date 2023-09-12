import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import type * as CSS from 'csstype'
import type { ResponsiveProp, ResponsiveValue } from '../use-breakpoint'
import { flexTheme, flexStyle } from './flex.style'
import { cx } from '@vtex/admin-ui-core'
import { get } from '@vtex/admin-ui-util'

export const Flex = forwardRef((props: FlexProps, ref: Ref<HTMLDivElement>) => {
  const {
    basis,
    direction,
    wrap,
    align,
    justify,
    grow,
    shrink,
    order,
    className = '',
    ...restProps
  } = props

  const responsiveCssProps = flexStyle({
    basis: toResponsiveObject(basis),
    direction: toResponsiveObject(direction),
    wrap: toResponsiveObject(wrap),
    align: toResponsiveObject(align),
    justify: toResponsiveObject(justify),
    grow: toResponsiveObject(grow),
    shrink: toResponsiveObject(shrink),
    order: toResponsiveObject(order),
  })

  return (
    <div
      ref={ref}
      style={responsiveCssProps}
      className={cx(className, flexTheme)}
      {...restProps}
    />
  )
})

export function toResponsiveObject<T>(
  responsiveValue?: ResponsiveProp<T>
): ResponsiveValue<T> {
  if (!responsiveValue) return responsiveValue as any

  const mobile = get(responsiveValue as object, 'mobile', responsiveValue)
  const tablet = get(responsiveValue as object, 'tablet', mobile)
  const desktop = get(responsiveValue as object, 'desktop', tablet)
  const widescreen = get(responsiveValue as object, 'widescreen', desktop)

  return {
    mobile,
    tablet,
    desktop,
    widescreen,
  }
}

export interface FlexProps extends ComponentPropsWithoutRef<'div'> {
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
