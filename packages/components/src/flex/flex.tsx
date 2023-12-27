import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cssVar, type CSSProperty, style } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'

import './flex.css'

/**
 * Flexbox implementation
 * @example
 * <Flex>
 *  <Button>Clear</Button>
 *  <Button variant="primary">Submit</Button>
 * </Flex>
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  props,
  ref
) {
  const {
    asChild = false,
    inline = false,
    order = 0,
    direction = 'row',
    grow = 0,
    wrap = 'nowrap',
    shrink = 1,
    basis = 'auto',
    justify = 'flex-start',
    align = 'stretch',
    gap = '$space-gap',
    style: styleObject = {},
    ...domProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      data-sl-flex
      ref={ref}
      data-inline={inline}
      style={style({
        '--sl-flex-order': order,
        '--sl-flex-direction': direction,
        '--sl-flex-grow': grow,
        '--sl-flex-wrap': wrap,
        '--sl-flex-shrink': shrink,
        '--sl-flex-basis': basis,
        '--sl-flex-justify': justify,
        '--sl-flex-align': align,
        '--sl-flex-gap': cssVar({ token: String(gap) }),
        ...styleObject,
      })}
      {...domProps}
    />
  )
})

export interface FlexProps extends ComponentPropsWithoutRef<'div'> {
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
  /**
   * Use `inline-flex` instead of `flex`
   * @default false
   */
  inline?: boolean
  /**
   * Children composition
   * @default false
   * @example
   * <Flex asChild>
   *  <button>
   *    A flex button
   *  </button>
   * </Flex>
   */
  asChild?: boolean
}
