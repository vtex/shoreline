import React, { Children, forwardRef, useRef } from 'react'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { TabList } from '../tab'
import { pageHeaderBottomTheme } from './page.style'

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
export const PageHeaderBottom = forwardRef(function PageHeaderBottom(
  props: PageHeaderBottomProps,
  ref: Ref<HTMLDivElement>
) {
  const { className = '', children, ...htmlProps } = props
  const hasTab = useRef(false)

  Children.forEach(children, (child) => {
    if ((child as any)?.type === TabList) {
      hasTab.current = true
    }
  })

  return (
    <div
      ref={ref}
      className={cx(pageHeaderBottomTheme, className)}
      data-tabs={hasTab.current}
      {...htmlProps}
    >
      {children}
    </div>
  )
})

export type PageHeaderBottomProps = ComponentPropsWithoutRef<'div'>
