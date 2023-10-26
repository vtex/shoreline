import { constants } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import React, { forwardRef } from 'react'

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  props,
  ref
) {
  const { columnWidths, style = {}, ...otherProps } = props

  return (
    <table
      data-sl-table
      ref={ref}
      style={
        {
          ...style,
          '--sl-table-grid-template-columns': columnWidths?.join(
            constants.whiteSpace
          ),
        } as CSSProperties
      }
      {...otherProps}
    />
  )
})

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  columnWidths?: string[]
}
