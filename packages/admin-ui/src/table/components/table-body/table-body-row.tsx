import { cx } from '@vtex/admin-ui-core'
import React, { memo } from 'react'
import { tableBodyRowTheme } from '../styles/table-body.css'

function TableBodyRow(props: TableBodyRowProps) {
  const { selected, children, onClick, className = '', ...rowProps } = props

  return (
    <tr
      className={cx(tableBodyRowTheme, className)}
      data-clickable={!!onClick}
      data-selected={selected}
      role="row"
      onClick={onClick}
      {...rowProps}
    >
      {children}
    </tr>
  )
}

export type TableBodyRowProps = {
  selected?: boolean
} & React.ComponentPropsWithoutRef<'tr'>

export const TBodyRow = memo(TableBodyRow) as typeof TableBodyRow
