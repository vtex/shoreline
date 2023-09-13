import { cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, RefObject } from 'react'
import React from 'react'

import type { DataViewStatus } from '../../data-view'
import type { BaseResolvers } from '../resolvers/base'
import type { TableColumn } from '../types'
import { tableStyle, tableTheme } from './styles/table.style'

export function Table<T>(props: TableProps<T>) {
  const {
    children,
    className = '',
    status,
    tableRef,
    columns,
    ...tableProps
  } = props

  const shouldRender = status === 'ready' || status === 'loading'

  if (!shouldRender) return null

  return (
    <table
      {...tableProps}
      ref={tableRef}
      role="table"
      style={tableStyle({ columns: columns as any }) as any}
      className={cx(tableTheme, className)}
    >
      {children}
    </table>
  )
}

export interface TableProps<T> extends ComponentPropsWithoutRef<'table'> {
  columns: Array<TableColumn<T, BaseResolvers<T>>>
  status: DataViewStatus
  tableRef?: RefObject<HTMLTableElement>
}
