import React, { ReactNode } from 'react'
import {
  SxStyleProp,
  ResponsiveValue,
  useResponsiveValue,
  useClassName,
} from '@vtex/admin-ui-system'

import { Overridable } from '../../types'
import { ColumnsProvider, useColumnsContext } from './context'

export interface ColumnsProps extends Overridable {
  children?: ReactNode
  spacing?: ResponsiveValue<number>
}

export function Columns(props: ColumnsProps) {
  const { spacing = 1, children } = props
  const styles: SxStyleProp = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  const className = useClassName({ props: { styles } })

  return (
    <div className={className}>
      <ColumnsProvider value={{ spacing }}>{children}</ColumnsProvider>
    </div>
  )
}

export interface ColumnProps extends Overridable {
  children?: ReactNode
  units?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>
  offset?: ResponsiveValue<'left' | 'right' | 'both' | 'none'>
}

export function Column(props: ColumnProps) {
  const { units, offset = 'none', ...layoutProps } = props
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

  const styles: SxStyleProp = responsiveUnits
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

  const className = useClassName({ props: { styles } })

  return <div className={className} {...layoutProps} />
}

Columns.Item = Column
