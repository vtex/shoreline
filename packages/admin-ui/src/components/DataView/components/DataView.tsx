import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
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
export const DataView = createComponent<'div', DataViewOptions>((props) => {
  const { children, state, ...restProps } = props

  return useElement('div', {
    baseStyle: {
      paddingY: '4',
      overflow: 'auto',
    },
    children: (
      <DataViewContext.Provider value={state}>
        {children}
        <DataViewStatus />
      </DataViewContext.Provider>
    ),
    ...restProps,
  })
})

export interface DataViewOptions {
  state: DataViewState
}
