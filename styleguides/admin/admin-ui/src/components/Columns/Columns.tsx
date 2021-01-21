import React, { ReactNode } from 'react'
import { StyleProp, ResponsiveValue } from '@vtex/admin-core'

import { Overridable } from '../../types'
import { ColumnsProvider } from './context'
import { ColumnsItem } from './Item'
import { useSystem } from '../../system'
export function Columns(props: ColumnsProps) {
  const { spacing = 1, children, styleOverrides, ...restProps } = props
  const styles: StyleProp = {
    display: 'flex',
    flexWrap: 'wrap',
  }
  const { cn } = useSystem()

  const className = cn({
    ...styles,
    ...styleOverrides,
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
