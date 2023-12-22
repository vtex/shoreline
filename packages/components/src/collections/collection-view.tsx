import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import './collection-view.css'
import { Skeleton } from '../skeleton'

export const CollectionView = forwardRef<HTMLDivElement, CollectionViewProps>(
  function CollectionView(props, ref) {
    const { status, children, ...otherProps } = props

    if (status === 'loading') {
      return <Skeleton data-collection-view-skeleton {...otherProps} />
    }

    // @TODO Other status must call the empty state

    return (
      <div data-sl-collection-view ref={ref} {...otherProps}>
        {children}
      </div>
    )
  }
)

export type CollectionStatus =
  | 'ready'
  | 'error'
  | 'loading'
  | 'empty'
  | 'not-found'

export interface CollectionViewProps extends ComponentPropsWithoutRef<'div'> {
  status: CollectionStatus
}
