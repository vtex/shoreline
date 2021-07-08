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
      const { item, onClick } = options
      const { children, onClick: _, ...rowProps } = props
      const state = useStateContext()

      const clickableCsx = onClick && !(state.status === 'loading')
        ? {
            cursor: 'pointer',
            ':hover': {
              bg: 'light.secondary',
            },
          }
        : {}

      const handleClick = () => {
        if (onClick && !(state.status === 'loading')) {
          onClick?.(item)
        }
      }

      return {
        role: 'row',
        csx: {
          textAlign: 'left',
          ...clickableCsx,
        },
        children: !!item ? (
          <Fragment>
            {state.columns.map((column) => {
              const content = state.resolveCell({ item, column })
              return (
                <Fragment key={`${item.id}-${String(column.id)}`}>
                  {cloneElement(children as any, {
                    column,
                    children: <Fragment>{content}</Fragment>,
                    density: state.density,
                  })}
                </Fragment>
              )
            })}
          </Fragment>
        ) : (
          children
        ),
        onClick: handleClick,
        ...rowProps,
      }
    },
    options: ['item', 'onClick'],
  }
)

interface RowOptions {
  item?: Record<string, any>
  onClick?: (item?: Record<string, any>) => void
}
