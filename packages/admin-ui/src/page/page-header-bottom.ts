import { Children, useRef } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './page.style'
import { TabList } from '../tab'

/**
 * Page header bottom component
 *
 * @example
 * import { PageHeader, PageHeaderBottom, TabList, PageHeaderTop, PageHeaderTitle } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *    </PageHeaderTitle>
 *  </PageHeaderTop>
 *  <PageHeaderBottom>
 *    <TabList>
 *     <Tab id="1">Label</Tab>
 *     <Tab id="2">Label</Tab>
 *    </TabList>
 *  </PageHeaderBottom>
 * </PageHeader>
 */
export const PageHeaderBottom = createComponent<'div'>((props) => {
  const { children, ...htmlProps } = props
  const hasTab = useRef(false)

  Children.forEach(children, (child) => {
    if ((child as any)?.type === TabList) {
      hasTab.current = true
    }
  })

  return useElement('div', {
    baseStyle: {
      ...style.pageHeaderBottomBase,
      ...style.pageHeaderBottom({ tabs: hasTab.current }),
    },
    children,
    ...htmlProps,
  })
})

export type PageHeaderBottom = ComponentPropsWithRef<typeof PageHeaderBottom>
