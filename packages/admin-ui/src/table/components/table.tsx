import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ReactNode } from 'react'

import type { TableStateReturn } from '../hooks/use-table-state'

import * as styles from '../styles/table.styles'

export const Table = createComponent<'table', TableOptions>((props) => {
  const { children, status, tableRef, columns, ...tableProps } = props

  const shouldRender = status === 'ready' || status === 'loading'

  if (!shouldRender) return null

  return useElement('table', {
    ...tableProps,
    ref: tableRef as any,
    role: 'table',
    baseStyle: styles.baseline({ columns }),
    children,
  })
})

Table.displayName = 'Table'

export interface TableOptions extends TableStateReturn {
  children?: ReactNode
}
