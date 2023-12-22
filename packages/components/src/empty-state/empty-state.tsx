import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/shoreline-utils'

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { src, title, children, description, ...otherProps } = props
    const titleId = useId()

    return (
      <div data-sl-empty-state ref={ref} {...otherProps}>
        <div data-sl-empty-state-container>
          {src ? (
            <img
              data-sl-empty-state-image
              src={src}
              alt=""
              aria-describedby={titleId}
            />
          ) : null}
          <div data-sl-empty-state-title id={titleId}>
            {title}
          </div>
          {description ? (
            <div data-sl-empty-state-description>{description}</div>
          ) : null}
          {children ? <div data-sl-empty-state-actions>{children}</div> : null}
        </div>
      </div>
    )
  }
)

export interface EmptyStateProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  title: ReactNode
  description?: ReactNode
  src?: string
}
