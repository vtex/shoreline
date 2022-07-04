import React, {
  ComponentPropsWithRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useIntersectionObserver, usePortal } from '@vtex/admin-ui-hooks'

import { PageHeaderContext } from './page-header-context'
import * as style from './page.style'
import { Box } from '../box'

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
    const { onPopNavigation, children, ref, ...htmlProps } = props
    const [scrollOnTop, setScrollOnTop] = useState(true)
    const pageHeaderViewportFakeRef = useRef<HTMLDivElement>(null)
    const pageHeaderRef = (ref as any) ?? useRef<'header'>(null)
    const { Portal } = usePortal()

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
                top: pageHeaderRef?.current?.offsetTop ?? 0,
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
