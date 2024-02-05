import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Compose } from '@vtex/shoreline-primitives'

/**
 * Wraps Content component to support Container Queries
 *
 * @kind layout
 * @example
 * <Container>
 *  <Content>...</Content>
 * </Container>
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(props, ref) {
    const { asChild = false, children, ...otherProps } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp data-sl-container ref={ref} {...otherProps}>
        {children}
      </Comp>
    )
  }
)

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}
