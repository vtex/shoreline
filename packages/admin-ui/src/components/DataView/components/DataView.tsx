import React from 'react'
import { jsx } from '@vtex/onda-react'
import { DataViewContext } from '../context'
import type { DataViewState } from '../state'
import { DataViewStatus } from './DataViewStatus'

/**
 * Layout to organize DataTables, DataGrids and its controls
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view} />
 */
export const DataView = jsx.div(
  {
    paddingY: '4',
    overflow: 'auto',
  },
  {
    options: ['state'],
    useOptions(options: DataViewOptions, props) {
      const { state } = options
      const { children, ...divProps } = props

      return {
        ...divProps,
        children: (
          <DataViewContext.Provider value={state}>
            {children}
            <DataViewStatus />
          </DataViewContext.Provider>
        ),
      }
    },
  }
)

export interface DataViewOptions {
  state: DataViewState
}
