import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Content containers allow merchants to easily scan information to understand its hierarchy and rhythm.
 *
 * @kind layout
 * @playground
 * @example
 * <Container>
 *  <Content>...</Content>
 * </Container>
 */
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  function Content(props, ref) {
    const { asChild = false, narrow = false, children, ...otherProps } = props
    const Comp = asChild ? Compose : 'div'

    return (
      <Comp data-sl-content data-narrow={narrow} ref={ref} {...otherProps}>
        {children}
      </Comp>
    )
  }
)

export interface ContentProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Decrease the space token in top and bottom padding.
   * @default false
   */
  narrow?: boolean
}
