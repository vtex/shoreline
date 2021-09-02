import React from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { DisclosureContent } from 'reakit/Disclosure'

import { useCollapsibleContext } from '../context'

export const CollapsibleContent = jsx(DisclosureContent)(
  {},
  {
    useOptions(_, props) {
      const { csx, children, ...contentProps } = props
      const disclosureProps = useCollapsibleContext()

      return {
        ...disclosureProps,
        children: disclosureProps.visible && (
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
