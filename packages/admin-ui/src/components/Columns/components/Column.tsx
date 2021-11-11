import type { ComponentPropsWithRef } from 'react'
import { jsx, useResponsiveValue } from '@vtex/admin-ui-react'
import type { ResponsiveValue } from '@vtex/admin-ui-react'

import { useColumnsContext } from './ColumnsContext'

export const Column = jsx('div')(
  {},
  {
    options: ['units', 'offset'],
    useOptions(options: ColumnOptions, props) {
      const { units, offset = 'none' } = options
      const { csx, ...layoutProps } = props
      const { spacing } = useColumnsContext()
      const responsiveUnits = useResponsiveValue(units)
      const responsiveOffset = useResponsiveValue(offset)

      const margin = {
        left: {
          marginLeft: 'auto',
        },
        right: {
          marginRight: 'auto',
        },
        both: {
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        none: {},
      }[responsiveOffset]

      const styles = responsiveUnits
        ? {
            flex: '0 0 auto',
            width: `${(Number(responsiveUnits) / 12) * 100}%`,
            ...margin,
            '&:not(:first-child)': {
              paddingLeft: spacing,
            },
          }
        : {
            flex: '1 1 0%',
            '&:not(:first-child)': {
              paddingLeft: spacing,
            },
            maxWidth: '100%',
          }

      return {
        ...layoutProps,
        csx: {
          ...styles,
          ...csx,
        },
      }
    },
  }
)

export interface ColumnOptions {
  units?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>
  offset?: ResponsiveValue<'left' | 'right' | 'both' | 'none'>
}

export type ColumnsItemProps = ComponentPropsWithRef<typeof Column> &
  ColumnOptions
