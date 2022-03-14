import { TabPanel as ReakitTabPanel } from 'reakit/Tab'
import { jsx } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

import { useTabsContext } from '../context'

export const TabPanel = jsx(ReakitTabPanel)(focusVisible('neutral'), {
  options: [],
  useOptions(_, props) {
    const { id, children, ...htmlProps } = props
    const { state } = useTabsContext()

    return { ...htmlProps, ...state, tabId: id, children }
  },
})

export type TabPanelProps = React.ComponentPropsWithRef<typeof TabPanel>
