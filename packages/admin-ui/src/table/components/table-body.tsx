import type { ReactNode } from 'react'
import React, { cloneElement, Fragment } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { isFunction } from '@vtex/admin-ui-util'

import { useStateContext } from '../context'
import { DataGridCell } from './table-cell'
import { useDataViewContext } from '../../components/DataView'
import * as styles from '../styles/table-body.styles'

export const DataGridBody = createComponent<'tbody', DataGridBodyOptions>(
  (props) => {
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
                    <DataGridBodyRow item={item} />
                  )}
                </Fragment>
              ))}
        </Fragment>
      ),
    })
  }
)

type RenderParams = {
  key: string
  item: any
  index: number
}

type RenderFunction = (params: RenderParams) => ReactNode

export interface DataGridBodyOptions {
  children?:
    | ((render: (callbackFunction: RenderFunction) => void) => ReactNode)
    | ReactNode
}

export const DataGridBodyRow = createComponent<'tr', DataGridBodyRowOptions>(
  (props) => {
    const { item = {}, role = 'row', children, ...rowProps } = props

    const { status } = useDataViewContext()
    const { onRowClick, columns, resolveCell, density } = useStateContext()

    const clickable = onRowClick && !(status === 'loading')

    const handleClick = () => {
      if (clickable) {
        onRowClick?.(item)
      }
    }

    return useElement('tr', {
      ...rowProps,
      baseStyle: {
        ...styles.tableRowbaseline,
        ...styles.variants({ clickable }),
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
                  <DataGridCell column={column} density={density}>
                    {content}
                  </DataGridCell>
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

export interface DataGridBodyRowOptions {
  item?: Record<string, any>
}
