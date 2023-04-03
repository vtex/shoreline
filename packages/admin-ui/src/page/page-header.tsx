import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { useEffect, forwardRef, useRef, useState } from 'react'
import { useIntersectionObserver, usePortal } from '@vtex/admin-ui-hooks'
import { cx } from '@vtex/admin-ui-core'

import { PageHeaderContext } from './page-header-context'
import {
  pageHeaderTheme,
  pageHeaderViewportRef,
  pageHeaderViewportRefStyle,
} from './page.css'

/**
 * Page header component
 *
 * @example
 * import { PageHeader, PageHeaderTop, PageHeaderTitle, PageHeaderActions, PageHeaderButton, PageHeaderBottom, PageHeaderTags, PageHeaderTag, PageHeaderMenuButton, TabList, Tab } from "@vtex/admin-ui"
 *
 * <PageHeader>
 *  <PageHeaderTop>
 *    <PageHeaderTitle>
 *      Product #123
 *      <PageHeaderTags>
 *        <PageHeaderTag label="Short text" />
 *        <PageHeaderTag label="Short text" />
 *      </PageHeaderTags>
 *    </PageHeaderTitle>
 *    <PageHeaderActions>
 *      <PageHeaderButton>Create</PageHeaderButton>
 *      <PageHeaderButton variant="critical">Delete</PageHeaderButton>
 *      <PageHeaderMenuButton state={state} />
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
export const PageHeader = forwardRef(function PageHeader(
  props: PageHeaderProps,
  ref: Ref<HTMLElement>
) {
  const { className = '', onPopNavigation, children, ...htmlProps } = props

  const [scrollOnTop, setScrollOnTop] = useState(true)
  const [distanceFromTop, setDistanceFromTop] = useState(0)
  const pageHeaderViewportFakeRef = useRef<HTMLDivElement>(null)
  const pageHeaderRef = (ref as any) ?? useRef<'header'>(null)
  const { Portal } = usePortal()

  useEffect(() => {
    pageHeaderRef?.current?.offsetTop &&
      setDistanceFromTop(pageHeaderRef.current.offsetTop)
  }, [])

  const { setNode } = useIntersectionObserver({
    root: null,
    rootMargin: '0%',
    threshold: [1],
    callback: (entry) => {
      setScrollOnTop(entry.isIntersecting)
    },
  })

  useEffect(() => {
    pageHeaderViewportFakeRef.current &&
      setNode(pageHeaderViewportFakeRef.current)
  }, [setNode])

  return (
    <header
      ref={pageHeaderRef}
      className={cx(pageHeaderTheme, className)}
      data-scrollOnTop={scrollOnTop}
      {...htmlProps}
    >
      <Portal>
        <div
          ref={pageHeaderViewportFakeRef}
          style={pageHeaderViewportRefStyle(distanceFromTop) as any}
          className={pageHeaderViewportRef}
        />
      </Portal>
      <PageHeaderContext.Provider
        value={{
          onPopNavigation,
        }}
      >
        {children}
      </PageHeaderContext.Provider>
    </header>
  )
})

export interface PageHeaderProps extends ComponentPropsWithoutRef<'header'> {
  /**
   * Callback function to the "return", or "back" method you would like.
   */
  onPopNavigation?: () => void
}
