import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Collections containers allow merchants to view and control a set of items in one or more layout types.
 *
 * @example
 * <Collections>
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
 *  </Collections>
 */
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

export type CollectionsProps = ComponentPropsWithoutRef<'div'>
