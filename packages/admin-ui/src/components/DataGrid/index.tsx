import React, { Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { Head } from './components/Head'
import { Body } from './components/Body'
import { Cell } from './components/Cell'
import { Section } from './components/Section'
import { Toolbar } from './components/Toolbar'
import { Search } from './components/Search'
import type { DataGridState } from './hooks/useDataGridState'
import { useDataGridState } from './hooks/useDataGridState'
import { StateContext } from './context'
import { Status } from './components/Status'
import { createColumns } from './createColumns'
import { DataGridColumn, DataGridDensity } from './typings'

const _Table = jsx.table(
  {
    display: 'table',
    width: '100%',
  },
  {
    useOptions(_, props) {
      const { children, ...tableProps } = props

      return {
        ...tableProps,
        children: children ?? (
          <Fragment>
            <Head />
            <Body />
          </Fragment>
        ),
      }
    },
  }
)

const Table = Object.assign(_Table, {
  Head,
  Body,
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
      const { Providers } = state
      const { children, ...dtgProps } = props

      return {
        ...dtgProps,
        children: (
          <StateContext.Provider value={state}>
            <Providers>
              {children ?? (
                <Table>
                  <Head />
                  <Body />
                </Table>
              )}
            </Providers>
            <Status />
          </StateContext.Provider>
        ),
      }
    },
    options: ['state'],
  }
)

/**
 * TODO: Style checkup (resolvers)
 * TODO: Unit testing
 * TODO: Documentation entries
 */
export const DataGrid = Object.assign(_DataGrid, {
  Table,
  Section,
  Toolbar,
  Search,
})

export { useDataGridState, createColumns, DataGridColumn, DataGridDensity }
