import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Renders a styled empty state area
 *
 * @example
 *    <EmptyState>
 *      <Heading>Title goes here</Heading>
 *       <Slot name="actions">
 *         <Button variant="primary">label</Button>
 *      </Slot>
 *   </EmptyState>
 * */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { size = 'medium', children, ...otherProps } = props

    return (
      <div data-sl-empty-state data-sl-size={size} ref={ref} {...otherProps}>
        <div data-sl-empty-state-container>{children}</div>
      </div>
    )
  }
)

export interface EmptyStateProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Indicates size of empty state area
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}
