import { jsx } from '@vtex/onda-react'

import { Set } from '../../Set'

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
export const DataViewControls = jsx(Set)({
  paddingY: '4',
  width: '100%',
  variants: {
    sticky: {
      true: {
        position: 'sticky',
        top: 0,
      },
    },
  },
})

DataViewControls.defaultProps = {
  spacing: 3,
  sticky: false,
}
