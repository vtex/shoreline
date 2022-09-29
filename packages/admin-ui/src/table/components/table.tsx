import React from 'react'
import type { ReactNode } from 'react'

import type { BoxProps } from '../../box'
import { Box } from '../../box'

import type { TableStateReturn } from '../hooks/use-table-state'

import * as styles from './styles/table.styles'

export const Table = (props: BoxProps & TableOptions) => {
  const { children, status, csx, tableRef, columns, ...tableProps } = props

  const shouldRender = status === 'ready' || status === 'loading'

  if (!shouldRender) return null

  return (
    <Box
      {...tableProps}
      ref={tableRef}
      as="table"
      role="table"
      csx={{ ...csx, ...styles.baseline({ columns }) }}
    >
      {children}
    </Box>
  )
}

Table.displayName = 'Table'

export interface TableOptions extends TableStateReturn {
  children?: ReactNode
}
