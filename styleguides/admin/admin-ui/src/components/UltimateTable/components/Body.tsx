import React, { cloneElement, Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { useStateContext } from '../context'

export const Body = jsx.tbody(
  {
    display: 'table-row-group',
  },
  {
    useOptions(_, { children, ...props }) {
      const state = useStateContext()

      return {
        ...props,
        role: 'rowgroup',
        children: (
          <Fragment>
            {state.data.map((item) => (
              <Fragment key={item.id}>
                {cloneElement(children as any, {
                  item,
                })}
              </Fragment>
            ))}
          </Fragment>
        ),
      }
    },
  }
)
