import React, { ReactNode } from 'react'
import {
  StyleProp,
  ResponsiveValue,
  useResponsiveValue,
  useClassName,
} from '@vtex/admin-ui-system'

import { Overridable } from '../../types'
import { useColumnsContext } from './context'

export function ColumnsItem(props: ColumnsItemProps) {
  const { units, offset = 'none', styleOverrides, ...layoutProps } = props
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

  const styles: StyleProp = responsiveUnits
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

  const className = useClassName({
    props: { styles: { ...styles, ...styleOverrides } },
  })

  return <div className={className} {...layoutProps} />
}

export interface ColumnsItemProps extends Overridable {
  children?: ReactNode
  units?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>
  offset?: ResponsiveValue<'left' | 'right' | 'both' | 'none'>
}
