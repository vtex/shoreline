import React from 'react'
import type { Meta } from '@storybook/react'

import { Box } from '../../Box'
import { Tabs, Tab, TabContent, TabsList, useTabState } from '../index'
import { Card } from '../../Card'
import { Heading } from '../../Heading'
import { Set } from '../../Set'

export default {
  title: 'admin-ui/Tabs',
  component: Tabs,
} as Meta

export function FixedWidth() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabsList aria-label="my-tabs">
        <Tab label="Tab 1" id="1" />
        <Tab label="Tab 2" id="2" />
        <Tab label="Tab 3" id="3" />
        <Tab label="Tab 4" id="4" />
      </TabsList>
      <TabContent id="1" csx={{ margin: 4 }}>
        Tab 1 Content
      </TabContent>
      <TabContent id="2" csx={{ margin: 4 }}>
        Tab 2 Content
      </TabContent>
      <TabContent id="3" csx={{ margin: 4 }}>
        Tab 3 Content
      </TabContent>
      <TabContent id="4" csx={{ margin: 4 }}>
        Tab 4 Content
      </TabContent>
    </Tabs>
  )
}

export function FluidWidth() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabsList fluid aria-label="my-tabs">
        <Tab label="Tab 1" id="1" />
        <Tab label="Tab 2" id="2" />
        <Tab label="Tab 3" id="3" />
        <Tab label="Tab 4" id="4" />
      </TabsList>
      <TabContent id="1" csx={{ margin: 4 }}>
        Tab 1 Content
      </TabContent>
      <TabContent id="2" csx={{ margin: 4 }}>
        Tab 2 Content
      </TabContent>
      <TabContent id="3" csx={{ margin: 4 }}>
        Tab 3 Content
      </TabContent>
      <TabContent id="4" csx={{ margin: 4 }}>
        Tab 4 Content
      </TabContent>
    </Tabs>
  )
}

function Header() {
  return (
    <Box csx={{ marginTop: 5, border: 'divider-bottom' }}>
      <Set orientation="vertical" fluid spacing={5}>
        <Box csx={{ marginLeft: 4 }}>
          <Heading>Provider Manager</Heading>
        </Box>
        <TabsList aria-label="my-tabs">
          <Tab label="Pending" id="pending" />
          <Tab label="Published" id="published" />
        </TabsList>
      </Set>
    </Box>
  )
}

function Content() {
  return (
    <Box csx={{ padding: 4 }}>
      <TabContent id="published">
        <Card csx={{ marginTop: 2 }}>Published Content</Card>
      </TabContent>
      <TabContent id="pending">
        <Card csx={{ marginTop: 2 }}>Pending Content</Card>
      </TabContent>
    </Box>
  )
}

export function HeaderTabs() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <Header />
      <Content />
    </Tabs>
  )
}
