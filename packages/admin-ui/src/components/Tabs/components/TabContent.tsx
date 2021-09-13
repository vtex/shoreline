import { TabPanel as ReakitTabPanel } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'

import { useTabsContext } from '../context'

export const TabContent = jsx(ReakitTabPanel)(
  {
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
  },
  {
    options: [],
    useOptions(_, props) {
      const { id, children, ...htmlProps } = props
      const { state } = useTabsContext()

      return { ...htmlProps, ...state, tabId: id, children }
    },
  }
)

export type TabContentProps = React.ComponentPropsWithRef<typeof TabContent>
