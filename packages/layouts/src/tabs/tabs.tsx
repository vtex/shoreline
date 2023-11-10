import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type {
  TabProviderProps,
  TabPanelProps,
} from '@vtex/shoreline-components'
import {
  TabProvider,
  TabList,
  Tab as BaseTab,
  TabPanel as BaseTabPanel,
  useTabContext,
} from '@vtex/shoreline-components'
import Link from 'next/link'

export { TabList }

export function Tabs(props: TabProviderProps) {
  const router = useRouter()
  const selectedId = usePathname()

  return (
    <TabProvider
      selectedId={selectedId}
      setSelectedId={(id) => router.push(id || selectedId)}
      {...props}
    />
  )
}

export const Tab = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(function Tab(props, ref) {
  const id = props.href.toString()

  return (
    <BaseTab ref={ref} id={id} className="tab" asChild>
      <Link href={props.href}>{props.children}</Link>
    </BaseTab>
  )
})

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  function TabPanel(props, ref) {
    const tab = useTabContext()

    if (!tab) throw new Error('TabPanel must be wrapped in a Tabs component')

    const tabId = tab.useState('selectedId')

    return <BaseTabPanel ref={ref} tabId={tabId ?? ''} {...props} />
  }
)
