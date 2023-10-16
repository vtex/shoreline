import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cssVar } from '@vtex/shoreline-utils'
import { style } from '../utils/style'

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  props,
  ref
) {
  const {
    children,
    direction = 'column',
    space = '$space-gap',
    fluid = false,
    align = 'start',
    ...restProps
  } = props

  return (
    <div
      data-sl-stack
      ref={ref}
      data-direction={direction}
      data-fluid={fluid}
      style={style({
        '--sl-stack-space': cssVar({ token: space }),
        '--sl-stack-align': cssVar({ token: align }),
      })}
      {...restProps}
    >
      {children}
    </div>
  )
})

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * direction of items
   * @default column
   */
  direction?: 'column' | 'row'
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
