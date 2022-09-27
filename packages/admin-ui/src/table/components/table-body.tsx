import React, { cloneElement, Fragment, memo, useCallback } from 'react'
import type { ReactNode } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { isFunction } from '@vtex/admin-ui-util'

import { useDataViewContext } from '../../data-view'
import { useSelectionTreeContext } from '../../components/SelectionTree'
import type {
  TableBodyState,
  TableBodyRowState,
} from '../hooks/use-table-state'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'
import { TableCell } from './table-cell'
import * as styles from '../styles/table-body.styles'

export const TableBody = memo(
  createComponent<'tbody', TableBodyOptions>((props) => {
    const { children, state, ...restProps } = props

    const { data, getRowKey } = state

    return useElement('tbody', {
      ...restProps,
      role: 'rowgroup',
      baseStyle: styles.baseline,
      children: (
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
            : data.map((item) => (
                <Fragment key={String(getRowKey(item))}>
                  {cloneElement(children as any, {
                    item,
                  })}
                </Fragment>
              ))}
        </Fragment>
      ),
    })
  })
)

TableBody.displayName = 'TableBody'

type RenderParams = {
  key: string
  item: any
  index: number
}

type RenderFunction = (params: RenderParams) => ReactNode

export interface TableBodyOptions {
  children?:
    | ((render: (callbackFunction: RenderFunction) => void) => ReactNode)
    | ReactNode
  state: TableBodyState
}

export interface TableBodyRowOptions {
  item?: Record<string, any>
  state: TableBodyRowState
}

export const TableBodyRow = memo(
  createComponent<'tr', TableBodyRowOptions>((props) => {
    const { item = {}, state, children, ...rowProps } = props

    const { onRowClick, columns, resolveCell, cell } = state
    const { status } = useDataViewContext()

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

    const handleClick = () => {
      if (clickable) {
        onRowClick?.(item)
      }
    }

    return useElement('tr', {
      ...rowProps,
      baseStyle: {
        ...styles.rowBaseline,
        ...styles.variants({ clickable }),
        ...styles.variants({ selected: isRowSelected() }),
      },
      role: 'row',
      children: (
        <>
          {columns.map((column) => {
            const content = resolveCell({ item, column })

            return (
              <TableCell
                state={cell}
                fixed={column?.fixed}
                columnId={column.id}
                key={`${String(item.id)}-${String(column.id)}`}
              >
                {content}
              </TableCell>
            )
          })}
        </>
      ),
      onClick: handleClick,
    })
  })
)

TableBodyRow.displayName = 'TableBodyRow'

export interface TableBodyCellOptions {
  item?: Record<string, any>
  column: TableColumn<any, BaseResolvers<any>>
  content: ReactNode
  children: ReactNode
}
