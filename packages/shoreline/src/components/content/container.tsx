import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { Compose } from '../compose'

/**
 * Wraps Content component to support Container Queries
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

export interface ContainerOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type ContainerProps = ContainerOptions & ComponentPropsWithoutRef<'div'>
