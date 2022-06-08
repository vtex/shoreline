import React, { Fragment } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { DataGridHead } from './table-head'
import { DataGridBody } from './table-body'
import type { DataGridState } from '../hooks/use-table-state'
import { StateContext } from '../context'

export const DataGrid = createComponent<'table', DataGridOptions>((props) => {
  const { children, state, ...dtgProps } = props

  return useElement('table', {
    ...dtgProps,
    baseStyle: { display: 'table', width: '100%' },
    children: (
      <StateContext.Provider value={state}>
        {children ?? (
          <Fragment>
            <DataGridHead />
            <DataGridBody />
          </Fragment>
        )}
      </StateContext.Provider>
    ),
  })
})

export interface DataGridOptions {
  /**
   * DataGrid state
   */
  state: DataGridState<any>
}
