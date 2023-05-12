import React, { memo } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { tableBodyTheme } from '../styles/table-body.css'

function TableBody(props: TableBodyProps) {
  const { children, className = '', ...restProps } = props

  return (
    <tbody className={cx(tableBodyTheme, className)} {...restProps}>
      {children}
    </tbody>
  )
}

export const TBody = memo(TableBody) as typeof TableBody

export type TableBodyProps = React.ComponentPropsWithoutRef<'tbody'>
