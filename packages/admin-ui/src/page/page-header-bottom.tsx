import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { usePageHeaderContext } from './page-header-context'
import { TabList, Tab } from '../components/Tabs'
import * as style from './page.style'

export const PageHeaderBottom = createComponent<'div'>((props) => {
  const { ...htmlProps } = props
  const { tabOptions } = usePageHeaderContext()

  const tabs = tabOptions?.map((option) => (
    <Tab
      {...option}
      csx={{
        ...option.csx,
        ...style.pageHeaderTab,
      }}
    />
  ))

  if (tabs) {
    return useElement('div', {
      baseStyle: style.pageHeaderBottom,
      children: <TabList>{tabs}</TabList>,
      ...htmlProps,
    })
  }

  return null
})

export type PageHeaderBottom = ComponentPropsWithRef<typeof PageHeaderBottom>
