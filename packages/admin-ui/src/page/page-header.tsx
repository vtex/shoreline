import type { ComponentPropsWithRef } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useIntersectionObserver, usePortal } from '@vtex/admin-ui-hooks'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'
import { Box } from '../box'

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
export const PageHeader = createComponent<'header', PageHeaderOptions>(
  (props) => {
    const { onPopNavigation, children, ref, ...htmlProps } = props
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

    return useElement('header', {
      baseStyle: {
        ...style.pageHeaderBase,
        ...style.pageHeader({ scrollOnTop }),
      },
      ref: pageHeaderRef as any,
      children: (
        <>
          <Portal>
            <Box
              ref={pageHeaderViewportFakeRef}
              csx={{
                ...style.pageHeaderViewportRef,
                top: distanceFromTop,
              }}
            />
          </Portal>
          <PageHeaderContext.Provider
            value={{
              onPopNavigation,
            }}
          >
            {children}
          </PageHeaderContext.Provider>
        </>
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
