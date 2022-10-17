import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { DataViewContext } from '../context'
import type { DataViewState } from '../data-view.state'
import { DataViewStatus } from './data-view-status'
import * as styles from './data-view.styles'
import { Stack } from '../../stack'

/**
 * Layout to organize Tables and its controllers
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view} />
 */
export const DataView = createComponent<'div', DataViewOptions>((props) => {
  const { children, state, ...restProps } = props

  const isEmpty = state.status === 'empty'

  return useElement('div', {
    baseStyle: styles.baseline,
    children: (
      <DataViewContext.Provider value={state}>
        <Stack space="$2xl" csx={{ height: '100%' }}>
          {isEmpty ? null : children}
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
