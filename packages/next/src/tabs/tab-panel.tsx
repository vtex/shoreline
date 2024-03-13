import React from 'react'
import type { TabPanelProps } from '@vtex/shoreline'
import { TabPanel, forwardRef, useTabContext, invariant } from '@vtex/shoreline'

/**
 * This component uses Next's Parallel Routes to allow tabs to change the browser URL
 * @see https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 * @example
 * function Layout(props: { tabs: React.ReactNode }) {
 *
 *  return (
 *    <NextTabProvider>
 *      <NextTabList>
 *        <NextTab href="/">Features</NextTab>
 *        <NextTab href="/new">New</NextTab>
 *      </NextTabList>
 *      <NextTabPanel>{props.tabs}</NextTabPanel>
 *    </NextTabProvider>
 *  )
 * }
 */
export const NextTabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  function NextTabPanel(props, ref) {
    const tabStore = useTabContext()

    invariant(tabStore, 'TabPanel must be wrapped in a Tabs component')
    const tabId = tabStore.useState('selectedId')

    return <TabPanel ref={ref} tabId={tabId ?? ''} {...props} />
  }
)

export type NextTabPanelProps = Omit<TabPanelProps, 'tabId'>
