import { Tab as AriakitTab } from 'ariakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './tabs.style'

export const Tab = createComponent<typeof AriakitTab>((props) => {
  return useElement(AriakitTab, {
    ...props,
    baseStyle: style.tab,
  })
})

export type TabProps = React.ComponentPropsWithRef<typeof Tab>
