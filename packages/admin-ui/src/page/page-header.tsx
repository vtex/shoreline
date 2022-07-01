import React, { useEffect, useState } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'

/**
 * Page header component
 *
 * @example
 * import { Tabs, TabPanel, Button, PageHeader } from "@vtex/admin-ui"
 *
 * <Tabs state={tabs}>
 *   <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
 *     Product #123
 *   </PageHeader>
 *   <TabPanel id="1">
 *     <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
 *   </TabPanel>
 *   <TabPanel id="2">
 *     <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
 *   </TabPanel>
 *   <TabPanel id="3">
 *     <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
 *   </TabPanel>
 * </Tabs>
 */
export const PageHeader = createComponent<'header', PageHeaderOptions>(
  (props) => {
    const { onPopNavigation, children, ...htmlProps } = props

    const [scrollOnTop, setScrollOnTop] = useState(window.scrollY === 0)

    useEffect(() => {
      const threshold = 0
      let lastScrollY = window.scrollY
      let ticking = false

      const updateScrolling = () => {
        const scrollY = window.scrollY

        if (scrollY === threshold) {
          setScrollOnTop(true)

          return
        }

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          ticking = false

          return
        }

        setScrollOnTop(false)
        lastScrollY = scrollY > threshold ? scrollY : threshold
        ticking = false
      }

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrolling)
          ticking = true
        }
      }

      window.addEventListener('scroll', onScroll)

      return () => window.removeEventListener('scroll', onScroll)
    }, [scrollOnTop])

    return useElement('header', {
      baseStyle: style.pageHeader({ scrollOnTop }),
      children: (
        <PageHeaderContext.Provider
          value={{
            onPopNavigation,
          }}
        >
          {children}
        </PageHeaderContext.Provider>
      ),
      ...htmlProps,
    })
  }
)

export interface PageHeaderOptions {
  /**
   * Callback function to the "return", or "back" method you would like.
   */
  onPopNavigation?: () => void
}

export type PageHeaderProps = ComponentPropsWithRef<typeof PageHeader> &
  PageHeaderOptions
