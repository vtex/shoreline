import { TabPanel as ReakitTabPanel } from 'reakit'
import { jsx } from '@vtex/admin-ui-react'

import { useTabsContext } from '../context'

export const TabPanel = jsx(ReakitTabPanel)(
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

export type TabPanelProps = React.ComponentPropsWithRef<typeof TabPanel>
