import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Collection containers allow merchants to view and control a set of items in one or more layout types.
 *
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

export type CollectionProps = ComponentPropsWithoutRef<'div'>
