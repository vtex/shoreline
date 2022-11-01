import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Stack } from '../../stack'
import * as styles from './data-view.styles'

/**
 * Organizes the DataView header
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view}>
 *    <DataViewHeader>
 *      {content}
 *    </DataViewHeader>
 * </DataView>
 */
export const DataViewHeader = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: styles.header,
    children: (
      <Stack space="$space-4" csx={{ width: '100%' }}>
        {children}
      </Stack>
    ),
  })
})
