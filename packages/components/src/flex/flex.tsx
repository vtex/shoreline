import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import type { CSSProperty } from '@vtex/shoreline-utils'

export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  props,
  ref
) {
  const {
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

  return (
    <div
      data-sl-flex
      ref={ref}
      style={
        {
          '--sl-flex-order': order,
          '--sl-flex-direction': direction,
          '--sl-flex-grow': grow,
          '--sl-flex-wrap': wrap,
          '--sl-flex-shrink': shrink,
          '--sl-flex-basis': basis,
          '--sl-flex-justify': justify,
          '--sl-flex-align': align,
          '--sl-flex-gap': gap,
          '--sl-flex-rowGap': rowGap,
          '--sl-flex-columnGap': columnGap,
        } as CSSProperties
      }
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
