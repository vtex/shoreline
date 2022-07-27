import { Tab as AriakitTab } from 'ariakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ReactNode } from 'react'
import type { TabState } from './tab.state'

import * as style from './tabs.style'

export const Tab = createComponent<typeof AriakitTab, TabOptions>((props) => {
  return useElement(AriakitTab, {
    ...props,
    baseStyle: style.tab,
  })
})

export interface TabOptions {
  state?: TabState
  id?: string
  children?: ReactNode
}

export type TabProps = React.ComponentPropsWithRef<typeof Tab>
