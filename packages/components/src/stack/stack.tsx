import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx, cssVar } from '@vtex/shoreline-utils'

import { stackStyle } from './stack.css'

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  props,
  ref
) {
  const {
    className,
    children,
    direction = 'column',
    space = '$space-0',
    fluid = false,
    align = 'start',
    ...restProps
  } = props

  return (
    <div
      ref={ref}
      data-direction={direction}
      data-fluid={fluid}
      style={stackVariables(space, align)}
      className={cx(stackStyle, className)}
      {...restProps}
    >
      {children}
    </div>
  )
})

function stackVariables(space: string, align: string) {
  return {
    '--sl-stack-space': cssVar({ token: space }),
    '--sl-stack-align': cssVar({ token: align }),
  } as CSSProperties
}

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
  space: string
  /**
   * items alignment
   * @default start
   */
  align?: 'start' | 'end'
}
