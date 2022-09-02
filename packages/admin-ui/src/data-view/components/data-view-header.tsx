import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as styles from './data-view.styles'

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
export const DataViewHeader = createComponent<'div'>((props) => {
  return useElement('div', {
    ...props,
    baseStyle: styles.header,
  })
})
