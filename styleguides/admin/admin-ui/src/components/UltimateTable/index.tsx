import React from 'react'
import { jsx } from '@vtex/onda-react'

import { Head } from './components/Head'
import { Body } from './components/Body'
import { Row } from './components/Row'
import { Cell } from './components/Cell'
import { UseTableStateReturn } from './hooks/useTableState'
import { TableDensity } from './typings'
import { StateContext } from './context'

interface TableOptions {
  /**
   * Density of rows
   * @default regular
   */
  density?: TableDensity
  /**
   * Table state
   */
  state: UseTableStateReturn<any>
}

const Table = jsx.table(
  {
    display: 'table',
    width: 'full',
  },
  {
    useOptions(options: TableOptions, props) {
      const { state } = options
      const { children, ...tableProps } = props

      return {
        ...tableProps,
        children: (
          <StateContext.Provider value={state}>
            {children}
          </StateContext.Provider>
        ),
      }
    },
    options: ['density', 'state'],
  }
)

export const UltimateTable = Object.assign(Table, {
  Head,
  Body,
  Row,
  Cell,
})
