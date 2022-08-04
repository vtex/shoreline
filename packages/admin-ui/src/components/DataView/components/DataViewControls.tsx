import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'
import { styleVariants } from '@vtex/admin-ui-core'

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
export const DataViewControls = createComponent<'div', DataViewControlsOptions>(
  (props) => {
    const { sticky = false, ...restProps } = props

    return useElement('div', {
      baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        paddingY: '$4',
        width: '100%',
        '> *:not(:first-child)': {
          marginLeft: '$3',
        },
        ...variants({ sticky }),
      },
      ...restProps,
    })
  }
)

const variants = styleVariants({
  sticky: {
    true: {
      position: 'sticky',
      top: 0,
    },
  },
})

export type DataViewControlsOptions = VariantProps<typeof variants>
