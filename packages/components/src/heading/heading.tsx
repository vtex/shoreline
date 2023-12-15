import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import './heading.css'
import { Compose } from '../compose'

/**
 * Heding is used to define levels of typography
 * @example
 * <Heading>Headline text</Heading>
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(props, ref) {
    const {
      asChild = false,
      level = 3,
      variant = 'display4',
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
   * @default 'display4'
   */
  variant?: 'display1' | 'display2' | 'display3' | 'display4'
  /**
   * Heading level
   * @default 3
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
}
