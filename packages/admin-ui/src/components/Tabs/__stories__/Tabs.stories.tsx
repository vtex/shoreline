import React from 'react'
import type { Meta } from '@storybook/react'

import { Box } from '../../Box'
import { Tabs, Tab, TabPanel, TabList, useTabState } from '../index'
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
      <TabList aria-label="my-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
        <Tab id="4">Tab 4</Tab>
      </TabList>
      <TabPanel id="1" csx={{ margin: 4 }}>
        Tab 1 Content
      </TabPanel>
      <TabPanel id="2" csx={{ margin: 4 }}>
        Tab 2 Content
      </TabPanel>
      <TabPanel id="3" csx={{ margin: 4 }}>
        Tab 3 Content
      </TabPanel>
      <TabPanel id="4" csx={{ margin: 4 }}>
        Tab 4 Content
      </TabPanel>
    </Tabs>
  )
}

export function FluidWidth() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList fluid aria-label="my-tabs">
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
        <Tab id="3">Tab 3</Tab>
        <Tab id="4">Tab 4</Tab>
      </TabList>
      <TabPanel id="1" csx={{ margin: 4 }}>
        Tab 1 Content
      </TabPanel>
      <TabPanel id="2" csx={{ margin: 4 }}>
        Tab 2 Content
      </TabPanel>
      <TabPanel id="3" csx={{ margin: 4 }}>
        Tab 3 Content
      </TabPanel>
      <TabPanel id="4" csx={{ margin: 4 }}>
        Tab 4 Content
      </TabPanel>
    </Tabs>
  )
}

function Header() {
  return (
    <Box csx={{ marginTop: 5, borderBottom: '$neutral' }}>
      <Set orientation="vertical" fluid spacing={5}>
        <Box csx={{ marginLeft: 4 }}>
          <Heading>Provider Manager</Heading>
        </Box>
        <TabList aria-label="my-tabs">
          <Tab id="pending">Pending</Tab>
          <Tab id="published">Published</Tab>
        </TabList>
      </Set>
    </Box>
  )
}

function Content() {
  return (
    <Box csx={{ padding: 4 }}>
      <TabPanel id="published">
        <Card csx={{ marginTop: 2 }}>Published Content</Card>
      </TabPanel>
      <TabPanel id="pending">
        <Card csx={{ marginTop: 2 }}>Pending Content</Card>
      </TabPanel>
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
