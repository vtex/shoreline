import React, { cloneElement, Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { Row } from './Row'
import { useStateContext } from '../context'

export const Head = jsx.thead(
  {
    display: 'table-header-group',
  },
  {
    useOptions: (_, props) => {
      const { children, ...headProps } = props
      const state = useStateContext()

      return {
        ...headProps,
        role: 'rowgroup',
        children: (
          <Row>
            {state.columns.map((column) => {
              const { content } = state.resolveHeader({
                column,
                items: state.data,
              })

              return (
                <Fragment key={String(column.id)}>
                  {cloneElement(children as any, {
                    column,
                    role: 'columnheader',
                    density: 'compact',
                    children: <Fragment>{content}</Fragment>,
                  })}
                </Fragment>
              )
            })}
          </Row>
        ),
      }
    },
  }
)
