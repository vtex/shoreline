import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { CSSProperty } from '@vtex/shoreline-utils'
import { cx } from '@vtex/shoreline-utils'

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

  const style = getFlexVariables({
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

interface FlexShorthandProps {
  /** Shorthand for CSS order property */
  order?: CSSProperty.Order
  /** Shorthand for CSS flexDirection property */
  direction?: CSSProperty.FlexDirection
  /** Shorthand for CSS flexGrow property */
  grow?: CSSProperty.FlexGrow
  /** Shorthand for CSS flexWrap property */
  wrap?: CSSProperty.FlexWrap
  /** Shorthand for CSS flexShrink property */
  shrink?: CSSProperty.FlexShrink
  /** Shorthand for CSS flexBasis property */
  basis?: CSSProperty.FlexBasis
  /** Shorthand for CSS justifyContent property */
  justify?: CSSProperty.JustifyContent
  /** Shorthand for CSS alignItems property */
  align?: CSSProperty.AlignItems
  /** Shorthand for CSS order property */
  gap?: CSSProperty.Gap
  /** Shorthand for CSS order property */
  rowGap?: CSSProperty.RowGap
  /** Shorthand for CSS order property */
  columnGap?: CSSProperty.ColumnGap
}

function getFlexVariables(props: Required<FlexShorthandProps>): CSSProperties {
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
