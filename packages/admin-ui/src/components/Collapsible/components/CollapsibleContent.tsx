import React from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'

import { useCollapsibleContext } from '../context'

export const CollapsibleContent = jsx('div')(
  {},
  {
    useOptions(_, props) {
      const { csx, children, ...contentProps } = props
      const { getCollapseProps } = useCollapsibleContext()

      return {
        ...getCollapseProps(),
        children: (
          <tag.div
            className="__admin-ui-collapsible--content"
            csx={{
              paddingX: 4,
              paddingBottom: 4,
              '.__admin-ui-collapsible--header': {
                padding: 4,
                paddingLeft: 0,
              },
              '.__admin-ui-collapsible--content': {
                paddingX: 4,
                paddingBottom: 4,
              },
              ...csx,
            }}
            {...contentProps}
          >
            {children}
          </tag.div>
        ),
      }
    },
  }
)
