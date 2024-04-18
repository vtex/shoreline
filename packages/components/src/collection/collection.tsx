import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'

/**
 * Collection combines a list of items with controls for the view. The list can be a Table and the controls can be a Search, Filters, and Pagination.
 * @status stable
 * @example
 * <Collection>
 *    <Slot name="header">
 *      <Slot name="controls">
 *        <Search />
 *        <Pagination page={1} total={74} />
 *      </Slot>
 *    </Slot>
 *    <CollectionView status="ready">
 *      <div className="ready-view" />
 *    </CollectionView>
 *    <Slot name="footer">
 *      <Pagination page={1} total={74} />
 *    </Slot>
 *  </Collection>
 */
export const Collection = forwardRef<HTMLDivElement, CollectionProps>(
  function Collection(props, ref) {
    const { children, ...otherProps } = props

    return (
      <div data-sl-collection ref={ref} {...otherProps}>
        {children}
      </div>
    )
  }
)

export interface CollectionOptions {
  /**
   * Component children
   */
  children?: ReactNode
}

export type CollectionProps = CollectionOptions &
  ComponentPropsWithoutRef<'div'>
