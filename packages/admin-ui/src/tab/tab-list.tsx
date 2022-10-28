import type { ReactNode } from 'react'
import React from 'react'
import { TabList as AriakitTabList } from 'ariakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './tabs.style'
import { Inline } from '../inline'
import type { TabState } from './tab.state'

export const TabList = createComponent<typeof AriakitTabList, TabListOptions>(
  (props) => {
    const { children, ...tabListProps } = props

    return useElement(AriakitTabList, {
      baseStyle: style.tabList,
      children: (
        <Inline hSpace="$space-2" spaceInside>
          {children}
        </Inline>
      ),
      ...tabListProps,
    });
  }
)

export type TabListOptions = {
  state: TabState
  children?: ReactNode
}

export type TabListProps = React.ComponentPropsWithRef<typeof TabList>
