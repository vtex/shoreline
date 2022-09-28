import React, { cloneElement, Fragment, useCallback, memo } from 'react'
import type { ReactNode } from 'react'
import { isFunction } from '@vtex/admin-ui-util'

import { useSelectionTreeContext } from '../../components/SelectionTree'
import type {
  TableBodyState,
  TableBodyRowState,
} from '../hooks/use-table-state'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'
import * as styles from '../styles/table-body.styles'
import { Box } from '../../box'
import type { StyleProp } from '@vtex/admin-ui-core'

export const TableBody = memo((props: TableBodyProps) => {
  const { children, data, getRowKey, ...restProps } = props

  // const { data, getRowKey } = state

  return (
    <Box as="tbody" role="rowgroup" {...restProps} csx={styles.baseline}>
      <Fragment>
        {isFunction(children)
          ? children(function render(callback: RenderFunction) {
              return data.map((item, index) => {
                const key = String(getRowKey(item))

                return (
                  <Fragment key={key}>
                    {callback({ item, key, index })}
                  </Fragment>
                )
              })
            })
          : data.map((item) => {
              return (
                <Fragment key={String(getRowKey(item))}>
                  {cloneElement(children as any, {
                    item,
                  })}
                </Fragment>
              )
            })}
      </Fragment>
    </Box>
  )
})

TableBody.displayName = 'TableBody'

type RenderParams = {
  key: string
  item: any
  index: number
}

type RenderFunction = (params: RenderParams) => ReactNode

export interface TableBodyOptions extends TableBodyState {
  children?:
    | ((render: (callbackFunction: RenderFunction) => void) => ReactNode)
    | ReactNode
}

export type TableBodyProps = TableBodyOptions & {
  csx?: StyleProp
} & React.ComponentPropsWithoutRef<'tbody'>
export interface TableBodyRowOptions extends TableBodyRowState {
  item?: Record<string, any>
}

export type TableBodyRowProps = TableBodyRowOptions & {
  csx?: StyleProp
} & React.ComponentPropsWithoutRef<'tr'>

export const TableBodyRow = memo((props: TableBodyRowProps) => {
  const {
    item = {},
    onRowClick,
    columns,
    resolveCell,
    status,
    children,
    ...rowProps
  } = props

  // const { onRowClick, columns, resolveCell, cell } = state

  const clickable = onRowClick && !(status === 'loading')

  const isRowSelected = useCallback(() => {
    const isSelectable = columns.some(
      (column) =>
        column?.resolver?.type === 'selection' ||
        column?.resolver?.type === 'bulk'
    )

    if (!isSelectable) {
      return false
    }

    const {
      allSelected = false,
      items: { value: selectedItemsIds },
    } = useSelectionTreeContext()

    if (!Array.isArray(selectedItemsIds)) return false

    return allSelected || selectedItemsIds.some((id) => id === item.id)
  }, [columns])

  const handleClick = useCallback(() => {
    if (clickable) {
      onRowClick?.(item)
    }
  }, [onRowClick])

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
      {columns.map((column) => {
        const content = resolveCell({ item, column })

        return (
          <Fragment key={`${String(item.id)}-${String(column.id)}`}>
            {cloneElement(children as any, {
              fixed: column?.fixed,
              columnId: column.id,
              children: content,
            })}
          </Fragment>
        )
      })}
    </Box>
  )
})

TableBodyRow.displayName = 'TableBodyRow'

export interface TableBodyCellOptions {
  item?: Record<string, any>
  column: TableColumn<any, BaseResolvers<any>>
  content: ReactNode
  children: ReactNode
}
