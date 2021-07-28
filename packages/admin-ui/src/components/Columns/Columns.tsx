import type { ReactNode } from 'react'
import React from 'react'
import { useSystem } from '@vtex/admin-core'
import type { StyleProp, ResponsiveValue } from '@vtex/admin-core'

import type { SystemComponent } from '../../types'
import { ColumnsProvider } from './context'
import { ColumnsItem } from './Item'

export function Columns(props: ColumnsProps) {
  const { spacing = 1, children, csx, ...restProps } = props
  const styles: StyleProp = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { cn } = useSystem()

  const className = cn({
    ...styles,
    ...csx,
  })

  return (
    <div className={className} {...restProps}>
      <ColumnsProvider value={{ spacing }}>{children}</ColumnsProvider>
    </div>
  )
}

Columns.Item = ColumnsItem

export interface ColumnsProps extends SystemComponent {
  children?: ReactNode
  spacing?: ResponsiveValue<number>
}
