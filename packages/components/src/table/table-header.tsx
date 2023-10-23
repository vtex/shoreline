import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(function TableHeader(props, ref) {
  return <thead data-sl-table-header ref={ref} {...props} />
})

export type TableHeaderProps = ComponentPropsWithoutRef<'thead'>
