import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { DataViewContext } from '../context'
import type { DataViewState } from '../data-view.state'
import { DataViewStatus } from './data-view-status'
import * as styles from './data-view.styles'
import { Stack } from '../../stack'

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
    baseStyle: styles.baseline,
    children: (
      <DataViewContext.Provider value={state}>
        <Stack space="$2xl">
          {children}
          <DataViewStatus />
        </Stack>
      </DataViewContext.Provider>
    ),
    ...restProps,
  })
})

export interface DataViewOptions {
  state: DataViewState
}
