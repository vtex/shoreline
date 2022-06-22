import { TabPanel as AriakitTabPanel } from 'ariakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './tabs.style'

export const TabPanel = createComponent<typeof AriakitTabPanel>((props) => {
  return useElement(AriakitTabPanel, {
    ...props,
    baseStyle: style.tabPanel,
  })
})

export type TabPanelProps = React.ComponentPropsWithRef<typeof TabPanel>
