import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody(props, ref) {
    return <tbody data-sl-table-body ref={ref} {...props} />
  }
)

export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>
