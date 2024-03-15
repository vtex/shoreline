import React from 'react'
import type { TabProviderProps } from '@vtex/shoreline'
import { TabProvider } from '@vtex/shoreline'
import { usePathname, useRouter } from 'next/navigation'

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
export function NextTabProvider(props: NextTabProviderProps) {
  const router = useRouter()
  const selectedId = usePathname()

  return (
    <TabProvider
      selectedId={selectedId}
      setSelectedId={(id?: string | null) => {
        router.push(id || selectedId)
      }}
      {...props}
    />
  )
}

export type NextTabProviderProps = Omit<
  TabProviderProps,
  'selectedId' | 'setSelectedId'
>
