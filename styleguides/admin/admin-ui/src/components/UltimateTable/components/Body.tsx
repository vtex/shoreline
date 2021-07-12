import React, { cloneElement, Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { useStateContext } from '../context'
import { Cell } from './Cell'

interface RowOptions {
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
      const { children, ...rowProps } = props
      const {
        status,
        onRowClick,
        columns,
        resolveCell,
        density,
      } = useStateContext()

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
              },
            }
          : {},
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

const _Body = jsx.tbody(
  {
    display: 'table-row-group',
  },
  {
    useOptions(_, { children, ...props }) {
      const { status, data, getRowKey } = useStateContext()

      const shouldRender = status === 'ready' || status === 'loading'

      return {
        ...props,
        role: 'rowgroup',
        children: shouldRender && (
          <Fragment>
            {data.map((item) => (
              <Fragment key={String(getRowKey(item))}>
                {!!children ? (
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
  Row
})