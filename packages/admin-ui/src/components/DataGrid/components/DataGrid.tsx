import React, { Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { Head } from './DataGridHead'
import { Body } from './DataGridBody'
import { Cell } from './DataGridCell'
import type { DataGridState } from '../hooks/useDataGridState'
import { StateContext } from '../context'

interface DataGridOptions {
  /**
   * DataGrid state
   */
  state: DataGridState<any>
}

const _DataGrid = jsx.table(
  { display: 'table', width: '100%' },
  {
    useOptions(options: DataGridOptions, props) {
      const { state } = options
      const { children, ...dtgProps } = props

      return {
        ...dtgProps,
        children: (
          <StateContext.Provider value={state}>
            {children ?? (
              <Fragment>
                <Head />
                <Body />
              </Fragment>
            )}
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
  Head,
  Body,
  Cell,
})
