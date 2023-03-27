import type { RefObject } from 'react'
import React, { useRef, useEffect, memo } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { useForkRef } from '@vtex/admin-ui-hooks'

import { useTableScroll } from '../hooks/use-table-scroll'

import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'
import { innerContainerTheme, tableCellTheme } from './styles/table-cell.css'

function _TableCell<T>(props: TableCellProps<T>) {
  const {
    column,
    onClick,
    role = 'cell',
    ref: htmlRef,
    children,
    className = '',
    lastFixedColumn,
    tableRef,
    ...cellProps
  } = props

  const isLastFixedColumn = column?.fixed && lastFixedColumn?.id === column?.id

  const hasHorizontalScroll = () => {
    if (!isLastFixedColumn) {
      return false
    }

    const { hasHorizontalScroll } = useTableScroll({ tableRef })

    return hasHorizontalScroll
  }

  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    const setCellPosition = () => {
      if (!ref?.current || !column?.fixed) {
        return
      }

      const { previousElementSibling } = ref.current
      const relativeLeftPosition =
        previousElementSibling?.getBoundingClientRect().width ?? 0

      ref.current.style.left = `${relativeLeftPosition}px`
    }

    setCellPosition()

    window.addEventListener('resize', setCellPosition, false)

    return () => {
      window.removeEventListener('resize', setCellPosition, false)
    }
  }, [])

  const resolvedClassName = column?.fixed
    ? cx(
        '__admin-ui-fixed-cell',
        className,
        isLastFixedColumn ? '__admin-ui-last-fixed-cell' : ''
      )
    : className

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <td
      {...cellProps}
      ref={useForkRef(ref, htmlRef)}
      onClick={onClick}
      role={role}
      data-clickable={!!onClick}
      data-fixed={column?.fixed}
      data-last-fixed={isLastFixedColumn}
      data-horizontal-scroll={hasHorizontalScroll}
      className={cx(tableCellTheme, resolvedClassName)}
    >
      <div className={innerContainerTheme}>{children}</div>
    </td>
  )
}

export const TableCell = memo(_TableCell) as typeof _TableCell

export type TableCellProps<T> = React.ComponentPropsWithRef<'td'> & {
  clickable?: boolean
  fixed?: boolean
  lastFixed?: boolean
  hasHorizontalScroll?: boolean
  column: TableColumn<T, BaseResolvers<T>>
  lastFixedColumn?: TableColumn<T, BaseResolvers<T>>
  tableRef?: RefObject<HTMLTableElement>
}
