import { forwardRef, style } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { Compose } from '../compose'
import type { FlexOptions } from '../flex'

/**
 * Row of the collection
 * @status stable
 */
export const CollectionRow = forwardRef<HTMLDivElement, CollectionRowProps>(
  function CollectionRow(props, ref) {
    const {
      asChild = false,
      style: styleProp,
      gap = '$space-2',
      align = 'center',
      justify = 'space-between',
      direction = 'row',
      ...otherProps
    } = props

    const Comp = asChild ? Compose : 'div'

    return (
      <Comp
        data-sl-collection-row
        style={style({
          '--gap': gap,
          '--align': align,
          '--justify': justify,
          '--direction': direction,
          ...styleProp,
        })}
        ref={ref}
        {...otherProps}
      />
    )
  }
)

export interface CollectionRowOptions
  extends Pick<FlexOptions, 'gap' | 'align' | 'justify' | 'direction'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
}

export type CollectionRowProps = CollectionRowOptions &
  ComponentPropsWithoutRef<'div'>
