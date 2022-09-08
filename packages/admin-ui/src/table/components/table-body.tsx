import React, { cloneElement, Fragment } from 'react'
import type { ReactNode } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { isFunction } from '@vtex/admin-ui-util'

import { useStateContext } from '../context'
import { TableCell } from './table-cell'
import { useDataViewContext } from '../../data-view'
import { useSelectionTreeContext } from '../../components/SelectionTree'

import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'

import * as styles from '../styles/table-body.styles'

export const TableBody = createComponent<'tbody', TableBodyOptions>((props) => {
  const { children, ...restProps } = props
  const { data, getRowKey } = useStateContext()

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
                {children ? (
                  cloneElement(children as any, {
                    item,
                  })
                ) : (
                  <TableBodyRow item={item} />
                )}
              </Fragment>
            ))}
      </Fragment>
    ),
  })
})

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
}

export const TableBodyRow = createComponent<'tr', TableBodyRowOptions>(
  (props) => {
    const { item = {}, children, ...rowProps } = props

    const { status } = useDataViewContext()
    const { onRowClick, columns } = useStateContext()

    const clickable = onRowClick && !(status === 'loading')

    const isRowSelected = () => {
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
    }

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
          {columns.map((column) => (
            <TableBodyCell
              item={item}
              column={column}
              key={`${String(item.id)}-${String(column.id)}`}
            >
              {children}
            </TableBodyCell>
          ))}
        </>
      ),
      onClick: handleClick,
    })
  }
)

const TableBodyCell = (props: TableBodyCellOptions) => {
  const { resolveCell } = useStateContext()

  const { item, column, children } = props

  const content = resolveCell({ item, column })

  return (
    <>
      {children ? (
        cloneElement(children as any, {
          column,
          children: content,
        })
      ) : (
        <TableCell column={column}>{content}</TableCell>
      )}
    </>
  )
}

export interface TableBodyCellOptions {
  item?: Record<string, any>
  column: TableColumn<any, BaseResolvers<any>>
  children: ReactNode
}

export interface TableBodyRowOptions {
  item?: Record<string, any>
}
