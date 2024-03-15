import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@vtex/shoreline/css'
import {
  Page,
  PageContent,
  PageHeader,
  PageHeading,
  Slot,
} from '@vtex/shoreline'
import {
  NextTab,
  NextTabList,
  NextTabPanel,
  NextTabProvider,
} from '@vtex/shoreline-next'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shoreline next 14 example',
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Page>
          <NextTabProvider>
            <PageHeader>
              <Slot name="top">
                <PageHeading>Shoreline 💙 Next 14</PageHeading>
              </Slot>
              <Slot name="bottom">
                <NextTabList>
                  <NextTab href="/">Features</NextTab>
                  <NextTab href="/details">Details</NextTab>
                </NextTabList>
              </Slot>
            </PageHeader>
            <PageContent>
              <NextTabPanel>{props.tabs}</NextTabPanel>
            </PageContent>
          </NextTabProvider>
        </Page>
      </body>
    </html>
  )
}

interface Props {
  tabs: ReactNode
}
