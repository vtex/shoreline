import React from 'react'
import { jsx } from '@vtex/onda-react'

import { Head } from './components/Head'
import { Body } from './components/Body'
import { Row } from './components/Row'
import { Cell } from './components/Cell'
import { Empty } from './components/Empty'
import { DataGridState } from './hooks/useDataGridState'
import { StateContext } from './context'

interface TableOptions {
  /**
   * Table state
   */
  state: DataGridState<any>
}

const _Table = jsx.table({
  display: 'table',
  width: 'full',
})

const Table = Object.assign(_Table, {
  Head,
  Body,
  Row,
  Cell,
})

const _DataGrid = jsx.div(
  {},
  {
    useOptions(options: TableOptions, props) {
      const { state } = options
      const { children, ...dtgProps } = props

      return {
        ...dtgProps,
        children: (
          <StateContext.Provider value={state}>
            {children}
          </StateContext.Provider>
        ),
      }
    },
    options: ['state'],
  }
)

export const DataGrid = Object.assign(_DataGrid, {
  Table,
  Empty,
})
