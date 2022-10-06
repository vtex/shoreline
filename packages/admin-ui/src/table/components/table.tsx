import type { StyleProp } from '@vtex/admin-ui-core'
import type { RefObject } from 'react'
import React from 'react'

import type { DataViewStatus } from '../../data-view'
import type { BaseResolvers } from '../resolvers/base'
import type { TableColumn } from '../types'
import { Box } from '../../box'

import * as styles from './styles/table.styles'

export function Table<T>(props: TableProps<T>) {
  const { children, status, csx, tableRef, columns, ...tableProps } = props

  const shouldRender = status === 'ready' || status === 'loading'

  if (!shouldRender) return null

  return (
    <Box
      {...tableProps}
      ref={tableRef}
      as="table"
      role="table"
      csx={{ ...csx, ...styles.baseline({ columns: columns as any }) }}
    >
      {children}
    </Box>
  )
}

export interface TableProps<T> extends React.ComponentPropsWithoutRef<'table'> {
  columns: Array<TableColumn<T, BaseResolvers<T>>>
  status: DataViewStatus
  tableRef?: RefObject<HTMLTableElement>
  csx?: StyleProp
}
