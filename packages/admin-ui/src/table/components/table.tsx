import React, { Fragment, useEffect, useRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { TableHead } from './table-head'
import { TableBody } from './table-body'
import type { TableState } from '../hooks/use-table-state'
import { StateContext } from '../context'

export const Table = createComponent<'div', TableOptions>((props) => {
  const { children, state, ...tableProps } = props

  const tableRef = useRef<HTMLDivElement>(null)

  return useElement('div', {
    ...tableProps,
    ref: tableRef as any,
    role: 'table',
    baseStyle: {
      display: 'grid',
      overflow: 'auto',
    },
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
