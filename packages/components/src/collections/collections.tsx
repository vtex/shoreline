import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import './collections.css'

export const Collections = forwardRef<HTMLDivElement, CollectionsProps>(
  function Collections(props, ref) {
    const { children, ...otherProps } = props

    return (
      <div data-sl-collections ref={ref} {...otherProps}>
        {children}
      </div>
    )
  }
)

export interface CollectionsProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}
