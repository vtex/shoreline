import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'
import type * as CSS from 'csstype'

import { flexStyle } from './flex.css'

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  props,
  ref
) {
  const {
    className,
    children,
    order = 0,
    direction = 'row',
    grow = 0,
    wrap = 'nowrap',
    shrink = 1,
    basis = 'auto',
    justify = 'flex-start',
    align = 'stretch',
    gap = 0,
    rowGap = 0,
    columnGap = 0,
    ...restProps
  } = props

  const style = flexVariables({
    order,
    direction,
    grow,
    wrap,
    shrink,
    basis,
    justify,
    align,
    gap,
    rowGap,
    columnGap,
  })

  return (
    <div
      ref={ref}
      style={style}
      className={cx(flexStyle, className)}
      {...restProps}
    >
      {children}
    </div>
  )
})

export type FlexProps = ComponentPropsWithoutRef<'div'> & FlexShorthandProps

export interface FlexShorthandProps {
  /** Shorthand for CSS order property */
  order?: CSS.Property.Order
  /** Shorthand for CSS flexDirection property */
  direction?: CSS.Property.FlexDirection
  /** Shorthand for CSS flexGrow property */
  grow?: CSS.Property.FlexGrow
  /** Shorthand for CSS flexWrap property */
  wrap?: CSS.Property.FlexWrap
  /** Shorthand for CSS flexShrink property */
  shrink?: CSS.Property.FlexShrink
  /** Shorthand for CSS flexBasis property */
  basis?: CSS.Property.FlexBasis
  /** Shorthand for CSS justifyContent property */
  justify?: CSS.Property.JustifyContent
  /** Shorthand for CSS alignItems property */
  align?: CSS.Property.AlignItems
  /** Shorthand for CSS order property */
  gap?: CSS.Property.Gap
  /** Shorthand for CSS order property */
  rowGap?: CSS.Property.RowGap
  /** Shorthand for CSS order property */
  columnGap?: CSS.Property.ColumnGap
}

function flexVariables(props: Required<FlexShorthandProps>) {
  return {
    '--sl-flex-order': props.order,
    '--sl-flex-direction': props.direction,
    '--sl-flex-grow': props.grow,
    '--sl-flex-wrap': props.wrap,
    '--sl-flex-shrink': props.shrink,
    '--sl-flex-basis': props.basis,
    '--sl-flex-justify': props.justify,
    '--sl-flex-align': props.align,
    '--sl-flex-gap': props.gap,
    '--sl-flex-rowGap': props.rowGap,
    '--sl-flex-columnGap': props.columnGap,
  } as CSSProperties
}
