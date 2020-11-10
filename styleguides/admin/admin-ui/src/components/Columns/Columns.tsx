import React, { ReactNode } from 'react'
import {
  SxStyleProp,
  ResponsiveValue,
  useClassName,
} from '@vtex/admin-ui-system'

import { Overridable } from '../../types'
import { ColumnsProvider } from './context'
import { ColumnsItem } from './Item'

export function Columns(props: ColumnsProps) {
  const { spacing = 1, children, styleOverrides, ...restProps } = props
  const styles: SxStyleProp = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  const className = useClassName({
    props: { styles: { ...styles, ...styleOverrides } },
  })

  return (
    <div className={className} {...restProps}>
      <ColumnsProvider value={{ spacing }}>{children}</ColumnsProvider>
    </div>
  )
}

Columns.Item = ColumnsItem

export interface ColumnsProps extends Overridable {
  children?: ReactNode
  spacing?: ResponsiveValue<number>
}
