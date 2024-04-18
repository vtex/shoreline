import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * An Empty State represents the state of a container, such as when there are no items to display or when the user isn't allowed to access items.
 * @status stable
 * @example
 * <EmptyState>
 *  <Heading>Title goes here</Heading>
 *  <Slot name="actions">
 *    <Button variant="primary">label</Button>
 *  </Slot>
 * </EmptyState>
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

export interface EmptyStateOptions {
  /**
   * Indicates size of empty state area
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

export type EmptyStateProps = EmptyStateOptions &
  ComponentPropsWithoutRef<'div'>
