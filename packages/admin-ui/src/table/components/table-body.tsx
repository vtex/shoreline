import React, { cloneElement, Fragment, useCallback, memo } from 'react'
import type { ReactNode } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { isFunction } from '@vtex/admin-ui-util'

import { useSelectionTreeContext } from '../../components/SelectionTree'
import type {
  TableBodyState,
  TableBodyRowState,
} from '../hooks/use-table-state'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'
import * as styles from '../styles/table-body.styles'

export const TableBody = memo(
  createComponent<'tbody', TableBodyOptions>((props) => {
    const { children, data, getRowKey, ...restProps } = props

    // const { data, getRowKey } = state

    React.useEffect(() => {
      console.log('children updated')
    }, [children])

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

export interface TableBodyOptions extends TableBodyState {
  children?:
    | ((render: (callbackFunction: RenderFunction) => void) => ReactNode)
    | ReactNode
}

export interface TableBodyRowOptions extends TableBodyRowState {
  item?: Record<string, any>
}

export const TableBodyRow = memo(
  createComponent<'tr', TableBodyRowOptions>((props) => {
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
              <Fragment key={`${String(item.id)}-${String(column.id)}`}>
                {cloneElement(children as any, {
                  fixed: column?.fixed,
                  columnId: column.id,
                  children: content,
                })}
              </Fragment>
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
