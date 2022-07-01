import React, { useEffect, useState } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'

/**
 * Page header component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderTitle, PageHeaderActions, Button, PageHeaderBottom, TabList, Tab } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *      <Stack direction="row" space="$m">
 *        <Tag label="Short text" size="large" />
 *        <Tag label="Short text" size="large" />
 *      </Stack>
 *    </PageHeaderTitle>
 *    <PageHeaderActions>
 *      <Button size="large" bleedY>Create</Button>
 *      <Button size="large" bleedY variant="critical">Delete</Button>
 *      <MenuButton
 *        state={state}
 *        variant="tertiary"
 *        size="large"
 *        labelHidden
 *        bleedY
 *      />
 *      <Menu state={state} aria-label="actions">
 *        <MenuItem label="Create" icon={<IconPlus />} />
 *        <MenuItem label="Edit" icon={<IconPencil />} />
 *      </Menu>
 *    </PageHeaderActions>
 *  </PageHeaderTop>
 *  <PageHeaderBottom>
 *    <TabList>
 *     <Tab id="1">Label</Tab>
 *     <Tab id="2">Label</Tab>
 *    </TabList>
 *  </PageHeaderBottom>
 * </PageHeader>
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
      baseStyle: {
        ...style.pageHeaderBase,
        ...style.pageHeader({ scrollOnTop }),
      },
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
