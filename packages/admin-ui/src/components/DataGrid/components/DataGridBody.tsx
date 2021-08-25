import type { ReactNode } from 'react'
import React, { cloneElement, Fragment } from 'react'
import { jsx } from '@vtex/onda-react'
import { isFunction } from '@vtex/onda-util'

import { useStateContext } from '../context'
import { Cell } from './DataGridCell'
import { useDataViewContext } from '../../DataView'

export interface RowOptions {
  item: Record<string, any>
}

const Row = jsx.tr(
  {
    display: 'table-row',
    bg: 'light.primary',
    textAlign: 'left',
  },
  {
    useOptions: (options: RowOptions, props) => {
      const { item } = options
      const { children, csx, ...rowProps } = props
      const { status } = useDataViewContext()
      const { onRowClick, columns, resolveCell, density } = useStateContext()

      const clickable = onRowClick && !(status === 'loading')

      const handleClick = () => {
        if (clickable) {
          onRowClick?.(item)
        }
      }

      return {
        ...rowProps,
        role: 'row',
        csx: clickable
          ? {
              cursor: 'pointer',
              ':hover': {
                bg: 'light.secondary',
                ...csx,
              },
            }
          : csx,
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
                    <Cell column={column} density={density}>
                      {content}
                    </Cell>
                  )}
                </Fragment>
              )
            })}
          </Fragment>
        ),
        onClick: handleClick,
      }
    },
    options: ['item'],
  }
)

type RenderParams = {
  key: string
  item: any
  index: number
}

type RenderFunction = (params: RenderParams) => ReactNode

const _Body = jsx.tbody(
  {
    display: 'table-row-group',
  },
  {
    useOptions(
      _: {
        children: (
          render: (callbackFunction: RenderFunction) => void
        ) => ReactNode | ReactNode
      },
      { children, ...props }
    ) {
      const { status } = useDataViewContext()
      const { data, getRowKey } = useStateContext()

      const shouldRender = status === 'ready' || status === 'loading'

      return {
        ...props,
        role: 'rowgroup',
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
                      <Row item={item} />
                    )}
                  </Fragment>
                ))}
          </Fragment>
        ),
      }
    },
  }
)

export const Body = Object.assign(_Body, {
  Row,
})
