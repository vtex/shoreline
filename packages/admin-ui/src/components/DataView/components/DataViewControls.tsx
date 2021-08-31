import { jsx } from '@vtex/admin-ui-react'

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
export const DataViewControls = jsx.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  paddingY: '4',
  width: '100%',
  '> *:not(:first-child)': {
    marginLeft: 3,
  },
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
  sticky: false,
}
