import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Heading is used to define levels of typography
 * @example
 * <Heading>Headline text</Heading>
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const {
      asChild = false,
      level = 3,
      variant = 'context',
      ...otherProps
    } = props

    const Comp = asChild ? Compose : `h${level}`

    return (
      <Comp data-sl-heading data-variant={variant} ref={ref} {...otherProps} />
    )
  }
)

export interface HeadingProps extends ComponentPropsWithoutRef<'h1'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Heading variant
   * @default 'context'
   */
  variant?: 'display1' | 'display2' | 'display3' | 'display4' | 'context'
  /**
   * Heading level
   * @default 3
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
}
