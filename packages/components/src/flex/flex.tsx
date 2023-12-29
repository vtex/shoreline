import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cssVar, type CSSProperty, style } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Flexbox layout
 * @see https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
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
  /**
   * CSS order
   * @default 0
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/order
   */
  order?: CSSProperty.Order
  /**
   * CSS flex-direction
   * @default 'row'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   */
  direction?: CSSProperty.FlexDirection
  /**
   * CSS flex-grow
   * @default 0
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
   */
  grow?: CSSProperty.FlexGrow
  /**
   * CSS flex-wrap
   * @default 'nowrap'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
   */
  wrap?: CSSProperty.FlexWrap
  /**
   * CSS flex-shrink
   * @default 1
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
   */
  shrink?: CSSProperty.FlexShrink
  /**
   * CSS flex-basis
   * @default 'auto'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
   */
  basis?: CSSProperty.FlexBasis
  /**
   * CSS justify-content
   * @default 'flex-start'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
   */
  justify?: CSSProperty.JustifyContent
  /**
   * CSS align-items
   * @default 'stretch'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
   */
  align?: CSSProperty.AlignItems
  /**
   * CSS Gap
   * @default '$space-gap'
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap
   */
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
