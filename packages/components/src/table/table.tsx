import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  props,
  ref
) {
  return <table data-sl-table ref={ref} {...props} />
})

export type TableProps = ComponentPropsWithoutRef<'table'>
