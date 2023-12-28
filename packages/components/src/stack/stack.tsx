import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { style } from '@vtex/shoreline-utils'
import { Compose } from '@vtex/shoreline-primitives'
import './stack.css'

/**
 * Spaces elements consistently
 * @example
 * <Stack>
 *  <div>Stacked 1</div>
 *  <div>Stacked 2</div>
 * </Stack>
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  props,
  ref
) {
  const {
    asChild = false,
    horizontal = false,
    space = '$space-gap',
    fluid = false,
    align = 'start',
    style: styleObject = {},
    ...restProps
  } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp
      data-sl-stack
      ref={ref}
      data-horizontal={horizontal}
      data-fluid={fluid}
      style={style({
        '--sl-stack-space': space,
        '--sl-stack-align': align,
        ...styleObject,
      })}
      {...restProps}
    />
  )
})

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Switches the layout to horizontal
   * @default false
   */
  horizontal?: boolean
  /**
   * Grows the width of items to match the parent
   * @default false
   */
  fluid?: boolean
  /**
   * space between items
   * @default 0
   */
  space?: string
  /**
   * items alignment
   * @default start
   */
  align?: 'start' | 'end'
}
