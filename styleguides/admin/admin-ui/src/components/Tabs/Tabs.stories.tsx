import React from 'react'
import { Meta } from '@storybook/react'

import { Tabs, useTabState } from './index'
import { Card } from '../Card'
import { Box } from '@vtex/admin-primitives'
import { Heading } from '../Heading'
import { Set } from '../Set'

export default {
  title: 'admin-ui/Tabs',
  component: Tabs,
} as Meta

export function FixedWidth() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <Tabs.List aria-label="my-tabs">
        <Tabs.Tab label="Tab 1" id="1" />
        <Tabs.Tab label="Tab 2" id="2" />
        <Tabs.Tab label="Tab 3" id="3" />
        <Tabs.Tab label="Tab 4" id="4" />
      </Tabs.List>
      <Tabs.Content id="1" csx={{ margin: 4 }}>
        Tab 1 Content
      </Tabs.Content>
      <Tabs.Content id="2" csx={{ margin: 4 }}>
        Tab 2 Content
      </Tabs.Content>
      <Tabs.Content id="3" csx={{ margin: 4 }}>
        Tab 3 Content
      </Tabs.Content>
      <Tabs.Content id="4" csx={{ margin: 4 }}>
        Tab 4 Content
      </Tabs.Content>
    </Tabs>
  )
}

export function FluidWidth() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <Tabs.List fluid aria-label="my-tabs">
        <Tabs.Tab label="Tab 1" id="1" />
        <Tabs.Tab label="Tab 2" id="2" />
        <Tabs.Tab label="Tab 3" id="3" />
        <Tabs.Tab label="Tab 4" id="4" />
      </Tabs.List>
      <Tabs.Content id="1" csx={{ margin: 4 }}>
        Tab 1 Content
      </Tabs.Content>
      <Tabs.Content id="2" csx={{ margin: 4 }}>
        Tab 2 Content
      </Tabs.Content>
      <Tabs.Content id="3" csx={{ margin: 4 }}>
        Tab 3 Content
      </Tabs.Content>
      <Tabs.Content id="4" csx={{ margin: 4 }}>
        Tab 4 Content
      </Tabs.Content>
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
        <Tabs.List aria-label="my-tabs">
          <Tabs.Tab label="Pending" id="pending" />
          <Tabs.Tab label="Published" id="published" />
        </Tabs.List>
      </Set>
    </Box>
  )
}

function TabsContent() {
  return (
    <Box csx={{ padding: 4 }}>
      <Tabs.Content id="published">
        <Card csx={{ marginTop: 2 }}>Published Content</Card>
      </Tabs.Content>
      <Tabs.Content id="pending">
        <Card csx={{ marginTop: 2 }}>Pending Content</Card>
      </Tabs.Content>
    </Box>
  )
}

export function HeaderTabs() {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <Header />
      <TabsContent />
    </Tabs>
  )
}
