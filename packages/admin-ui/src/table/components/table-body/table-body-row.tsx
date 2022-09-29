import React, { memo, useCallback } from 'react'
import { Box } from '../../../box'
import { useSelectionTreeContext } from '../../../components/SelectionTree'
import type { TableBodyRowProps } from './types'
import { TableBodyRowContext } from './context'

import * as styles from '../styles/table-body.styles'
import { get } from '@vtex/admin-ui-util'

function _TableBodyRow<T>(props: TableBodyRowProps<T>) {
  const { item, state, children, ...rowProps } = props

  const {
    resolveCell,
    isSelectable,
    onRowClick,
    tableRef,
    lastFixedColumn,
    status,
  } = state

  const clickable = onRowClick && !(status === 'loading')

  const isRowSelected = useCallback(() => {
    if (!isSelectable) {
      return false
    }

    const {
      allSelected = false,
      items: { value: selectedItemsIds },
    } = useSelectionTreeContext()

    if (!Array.isArray(selectedItemsIds)) return false

    return (
      allSelected ||
      selectedItemsIds.some((id) => id === get(item as any, 'id'))
    )
  }, [isSelectable])

  const handleClick = useCallback(() => {
    if (clickable) {
      onRowClick?.(item)
    }
  }, [onRowClick])

  const memoizedValues = React.useMemo(
    () => ({ resolveCell, item, tableRef, lastFixedColumn }),
    [resolveCell, item, tableRef, lastFixedColumn]
  )

  return (
    <Box
      as="tr"
      {...rowProps}
      role="row"
      csx={{
        ...styles.rowBaseline,
        ...styles.variants({ clickable }),
        ...styles.variants({ selected: isRowSelected() }),
      }}
      onClick={handleClick}
    >
      <TableBodyRowContext.Provider value={memoizedValues as any}>
        {children}
      </TableBodyRowContext.Provider>
    </Box>
  )
}

_TableBodyRow.displayName = 'TableBodyRow'

export const TableBodyRow = memo(_TableBodyRow) as typeof _TableBodyRow
