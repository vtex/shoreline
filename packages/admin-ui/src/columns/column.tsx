import type { ComponentPropsWithRef } from 'react'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import {
  createComponent,
  useElement,
  createHook,
  getResponsiveValue,
  useBreakpoint,
} from '@vtex/admin-ui-react'

import * as styles from './columns.style'

export const Column = createComponent<'div', ColumnOptions>((props) => {
  const elementProps = useColumn(props)

  return useElement('div', elementProps)
})

export const useColumn = createHook<'div', ColumnOptions>((props) => {
  const { units, offset = 'none', ...restProps } = props

  const { breakpoint } = useBreakpoint()

  const responsiveUnits = getResponsiveValue(units, breakpoint)
  const responsiveOffset = getResponsiveValue(offset, breakpoint)

  const resolvedOffset = responsiveUnits ? responsiveOffset : 'none'
  const hasUnits = !!responsiveUnits

  return {
    baseStyle: {
      ...styles.columnVariants({ offset: resolvedOffset, units: hasUnits }),
      ...styles.column(responsiveUnits),
    },
    ...restProps,
  }
})

export interface ColumnOptions {
  units?: ResponsiveProp<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>
  offset?: ResponsiveProp<'left' | 'right' | 'both' | 'none'>
}

export type ColumnsItemProps = ComponentPropsWithRef<typeof Column>
