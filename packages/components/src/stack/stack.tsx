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
    ...restProps
  } = props

  return (
    <div
      ref={ref}
      data-direction={direction}
      data-fluid={fluid}
      style={stackVariables(space)}
      className={cx(stackStyle, className)}
      {...restProps}
    >
      {children}
    </div>
  )
})

export interface StackProps extends ComponentPropsWithoutRef<'div'> {
  space?: string
  fluid?: boolean
  direction?: 'row' | 'column'
}

function stackVariables(space: string) {
  return {
    '--sl-stack-space': cssVar({ token: space }),
  } as CSSProperties
}
