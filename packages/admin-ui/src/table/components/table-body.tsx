import React, { cloneElement, Fragment } from 'react'
import type { ReactNode } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { isFunction } from '@vtex/admin-ui-util'

import { useStateContext } from '../context'
import { TableCell } from './table-cell'
import { useDataViewContext } from '../../components/DataView'
import { useSelectionTreeContext } from '../../components/SelectionTree'
import * as styles from '../styles/table-body.styles'

export const TableBody = createComponent<'tbody', TableBodyOptions>((props) => {
  const { children, role = 'rowgroup', ...restProps } = props
  const { status } = useDataViewContext()
  const { data, getRowKey } = useStateContext()

  const shouldRender = status === 'ready' || status === 'loading'

  return useElement('tbody', {
    ...restProps,
    role,
    baseStyle: styles.tbodyBaseline,
    children: shouldRender && (
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
    const { item = {}, role = 'row', children, ...rowProps } = props

    const { status } = useDataViewContext()
    const { onRowClick, columns, resolveCell, density } = useStateContext()

    const clickable = onRowClick && !(status === 'loading')

    const isRowSelected = () => {
      const isSelectable = columns.some(
        (column) => column?.resolver?.type === 'selection'
      )

      if (!isSelectable) {
        return false
      }

      const { selectedItems } = useSelectionTreeContext()

      return selectedItems.some((selectedItem) => selectedItem.id === item.id)
    }

    const handleClick = () => {
      if (clickable) {
        onRowClick?.(item)
      }
    }

    return useElement('tr', {
      ...rowProps,
      baseStyle: {
        ...styles.tableRowBaseline,
        ...styles.variants({ clickable }),
        ...styles.variants({ selected: isRowSelected() }),
      },
      role,
      children: (
        <Fragment>
          {columns.map((column) => {
            const content = resolveCell({ item, column })

            return (
              <Fragment key={`${item.id}-${String(column.id)}`}>
                {children ? (
                  cloneElement(children as any, {
                    column,
                    children: <Fragment>{content}</Fragment>,
                    density,
                  })
                ) : (
                  <TableCell column={column} density={density}>
                    {content}
                  </TableCell>
                )}
              </Fragment>
            )
          })}
        </Fragment>
      ),
      onClick: handleClick,
    })
  }
)

export interface TableBodyRowOptions {
  item?: Record<string, any>
}
