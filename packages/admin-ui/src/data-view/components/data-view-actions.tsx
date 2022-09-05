import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as styles from './data-view.styles'

/**
 * Organizes the DataView actions
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view}>
 *    <DataViewHeader>
 *      <DataViewActions>
 *        <Button>...</Button>
 *        <Pagination />
 *      </DataViewActions>
 *    </DataViewHeader>
 * </DataView>
 */
export const DataViewActions = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: styles.headerActions,
    children: <>{children}</>,
  })
})
