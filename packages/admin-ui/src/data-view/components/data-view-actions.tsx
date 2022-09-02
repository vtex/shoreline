import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as styles from './data-view.styles'
import { DataViewReady } from './data-view-ready'

/**
 * Organizes the DataView controls
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view}>
 *    <DataViewControls>
 *      any children here
 *    </DataViewControls>
 * </DataView>
 */
export const DataViewActions = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: styles.headerActions,
    children: <DataViewReady>{children}</DataViewReady>,
  })
})
