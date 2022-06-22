import { TabPanel as AriakitTabPanel } from 'ariakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { useTabPanelContext } from './tab-panel-list'
import type { TabState } from './tab.state'
import * as style from './tabs.style'

export const TabPanel = createComponent<
  typeof AriakitTabPanel,
  TabPanelOptions
>((props) => {
  const { state, ...tabPanelProps } = props
  const contextState = useTabPanelContext()

  const tabState: TabState = state ?? contextState ?? ({} as TabState)

  return useElement(AriakitTabPanel, {
    ...tabPanelProps,
    state: tabState,
    baseStyle: style.tabPanel,
  })
})

export interface TabPanelOptions {
  state?: TabState
}

export type TabPanelProps = React.ComponentPropsWithRef<typeof TabPanel>
