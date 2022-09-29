import type { StyleProp } from '@vtex/admin-ui-core'
import React, { memo, useMemo } from 'react'
import { Box } from '../../../box'
import type { TableHeadState } from '../../hooks/use-table-state'

import * as styles from '../styles/table-head.styles'
import { TableHeadContext } from './context'

function _TableHead<T>(props: TableHeadProps<T>) {
  const { children, state, ...headProps } = props

  const { tableRef, lastFixedColumn, resolveHeader, sortState } = state

  const memoizedValues = useMemo(
    () => ({ resolveHeader, sortState, tableRef, lastFixedColumn }),
    [sortState, resolveHeader, tableRef, lastFixedColumn]
  )

  return (
    <Box as="thead" csx={styles.baseline} role="rowgroup" {...headProps}>
      <Box as="tr" csx={styles.rowBaseline} role="row">
        <TableHeadContext.Provider value={memoizedValues as any}>
          {children}
        </TableHeadContext.Provider>
      </Box>
    </Box>
  )
}

export interface TableHeadOptions<T> {
  state: TableHeadState<T>
}

export type TableHeadProps<T> = React.ComponentPropsWithoutRef<'thead'> & {
  csx?: StyleProp
} & TableHeadOptions<T>

export const TableHead = memo(_TableHead) as typeof _TableHead
