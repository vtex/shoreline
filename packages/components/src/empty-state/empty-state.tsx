import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

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
  size?: 'small' | 'medium' | 'large'
}
