import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Box } from '../../../box'
import { useCollapsibleContext } from '../context'

export const CollapsibleContent = createComponent<'div'>((props) => {
  const { children, csx, ...restProps } = props
  const { getCollapseProps } = useCollapsibleContext()

  return useElement('div', {
    ...(getCollapseProps() as any),
    children: (
      <Box
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
        {...(restProps as any)}
      >
        {children}
      </Box>
    ),
  })
})
