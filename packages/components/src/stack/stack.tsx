import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { style } from '@vtex/shoreline-utils'
import './stack.css'

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  props,
  ref
) {
  const {
    children,
    horizontal = false,
    space = '$space-gap',
    fluid = false,
    align = 'start',
    style: styleObject = {},
    ...restProps
  } = props

  return (
    <div
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
    >
      {children}
    </div>
  )
})

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Switches the layout to horizontal
   * @default false
   */
  horizontal?: boolean
  /**
   * if the items should grow in width to match the container
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
