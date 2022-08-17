import React, { Fragment, useRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { TableHead } from './table-head'
import { TableBody } from './table-body'
import type { TableState } from '../hooks/use-table-state'
import { StateContext } from '../context'

import * as styles from '../styles/table.styles'

export const Table = createComponent<'table', TableOptions>((props) => {
  const { children, state, ...tableProps } = props

  const tableRef = useRef<HTMLTableElement>(null)

  return useElement('table', {
    ...tableProps,
    ref: tableRef as any,
    role: 'table',
    baseStyle: styles.baseline({ columns: state?.columns }),
    children: (
      <StateContext.Provider value={{ ...state, tableRef }}>
        {children ?? (
          <Fragment>
            <TableHead />
            <TableBody />
          </Fragment>
        )}
      </StateContext.Provider>
    ),
  })
})

export interface TableOptions {
  /**
   * Table state
   */
  state: TableState<any>
}
