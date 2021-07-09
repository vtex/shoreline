import React, { cloneElement, Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { useStateContext } from '../context'

export const Row = jsx.tr(
  {
    display: 'table-row',
    bg: 'light.primary',
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

      const clickableCsx = clickable
        ? {
            cursor: 'pointer',
            ':hover': {
              bg: 'light.secondary',
            },
          }
        : {}

      const handleClick = () => {
        if (clickable) {
          onRowClick?.(item)
        }
      }

      return {
        ...rowProps,
        role: 'row',
        csx: {
          textAlign: 'left',
          ...clickableCsx,
        },
        children: !!item ? (
          <Fragment>
            {columns.map((column) => {
              const content = resolveCell({ item, column })
              return (
                <Fragment key={`${item.id}-${String(column.id)}`}>
                  {cloneElement(children as any, {
                    column,
                    children: <Fragment>{content}</Fragment>,
                    density,
                  })}
                </Fragment>
              )
            })}
          </Fragment>
        ) : (
          children
        ),
        onClick: handleClick,
      }
    },
    options: ['item'],
  }
)

interface RowOptions {
  item?: Record<string, any>
}
