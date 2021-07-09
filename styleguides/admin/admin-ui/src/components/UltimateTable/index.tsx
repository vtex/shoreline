import React from 'react'
import { jsx } from '@vtex/onda-react'

import { Head } from './components/Head'
import { Body } from './components/Body'
import { Row } from './components/Row'
import { Cell } from './components/Cell'
import { Empty } from './components/Empty'
import { Section } from './components/Section'
import { Toolbar } from './components/Toolbar'
import { DataGridState } from './hooks/useDataGridState'
import { StateContext } from './context'
import { Status } from './components/Status'

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

interface DataGridOptions {
  /**
   * DataGrid state
   */
  state: DataGridState<any>
}

const _DataGrid = jsx.div(
  {},
  {
    useOptions(options: DataGridOptions, props) {
      const { state } = options
      const { children, ...dtgProps } = props

      return {
        ...dtgProps,
        children: (
          <StateContext.Provider value={state}>
            {children}
            <Status />
          </StateContext.Provider>
        ),
      }
    },
    options: ['state'],
  }
)

/** 
 * TODO: Search
 * TODO: FilterBar
 * TODO: Deep stories - dnd & windowing
 * TODO: Strip complexity
 * TODO: Style checkup
 * TODO: Unit testing
 * TODO: Documentation entries
 */
export const DataGrid = Object.assign(_DataGrid, {
  Table,
  Empty,
  Section,
  Toolbar
})
