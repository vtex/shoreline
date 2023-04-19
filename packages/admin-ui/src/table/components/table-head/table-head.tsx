import { cx } from '@vtex/admin-ui-core'
import React, { memo } from 'react'
import { tableHeadRowTheme, tableHeadTheme } from '../styles/table-head.css'

function TableHead(props: TableHeadProps) {
  const { children, className = '', ...headProps } = props

  return (
    <thead className={cx(tableHeadTheme, className)} {...headProps}>
      <tr className={tableHeadRowTheme} role="row">
        {children}
      </tr>
    </thead>
  )
}

export type TableHeadProps = React.ComponentPropsWithoutRef<'thead'>

export const THead = memo(TableHead) as typeof TableHead
