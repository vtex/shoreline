import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ReactNode } from 'react'

import { useDataViewContext } from '../../data-view'
import type { TableState } from '../hooks/use-table-state'

import * as styles from '../styles/table.styles'

export const Table = createComponent<'table', TableOptions>((props) => {
  const { children, state, ...tableProps } = props
  const { status } = useDataViewContext()

  const shouldRender = status === 'ready' || status === 'loading'

  if (!shouldRender) return null

  return useElement('table', {
    ...tableProps,
    ref: state.tableRef as any,
    role: 'table',
    baseStyle: styles.baseline({ columns: state?.columns }),
    children,
  })
})

export interface TableOptions {
  /**
   * Table state
   */
  state: TableState<any>
  children?: ReactNode
}
