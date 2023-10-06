import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { contentStyle } from './content.css'
import type { ContentContainerAs } from './types'

/**
 * Content containers allow merchants to easily scan information to understand its hierarchy and rhythm.
 * @example
 * <Container>
 *  <Content>...</Content>
 * </Container>
 */
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  function Content(props, ref) {
    const {
      as: Comp = 'div',
      narrow = false,
      className,
      children,
      ...otherProps
    } = props

    return (
      <Comp
        data-sl-content
        data-narrow={narrow}
        ref={ref}
        className={cx(contentStyle, className)}
        {...otherProps}
      >
        {children}
      </Comp>
    )
  }
)

export interface ContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Select the rendered html tag
   * @default 'div'
   */
  as?: ContentContainerAs
  /**
   * Decrease the space token in top and bottom padding.
   * @default false
   */
  narrow?: boolean
}
