import React, { cloneElement, Fragment } from 'react'
import { jsx } from '@vtex/onda-react'

import { useStateContext } from '../context'

export const Body = jsx.tbody(
  {
    display: 'table-row-group',
  },
  {
    useOptions(_, { children, ...props }) {
      const { status, data, getRowKey } = useStateContext()

      const shouldRender =
        status === 'ready' || status === 'loading'

      return {
        ...props,
        role: 'rowgroup',
        children: shouldRender && (
          <Fragment>
            {data.map((item) => (
              <Fragment key={String(getRowKey(item))}>
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
