import React from 'react'
import { TabList as AriakitTabList } from 'ariakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './tabs.style'
import { Inline } from '../inline'

export const TabList = createComponent<typeof AriakitTabList>((props) => {
  const { children, ...tabListProps } = props

  return useElement(AriakitTabList, {
    baseStyle: style.tabList,
    children: (
      <Inline hSpace="$m" spaceInside>
        {children}
      </Inline>
    ),
    ...tabListProps,
  })
})

export type TabListProps = React.ComponentPropsWithRef<typeof TabList>
