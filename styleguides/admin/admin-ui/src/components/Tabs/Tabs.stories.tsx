import React from 'react'
import { Meta } from '@storybook/react'

import { Tab, TabContent, TabList, Tabs, useTabState } from './index'
import { Card } from '../Card'
import { Box } from '../Box'
import { Heading } from '../Heading'
import { Set } from '../Set'

export default {
  title: 'components/Tabs',
  component: Tabs,
} as Meta

export function FixedWidth() {
  const state = useTabState()

  return (
    <Card styleOverrides={{ width: 600 }}>
      <Tabs state={state}>
        <TabList aria-label="my-tabs">
          <Tab label="Tab 1" tabId="1" />
          <Tab label="Tab 2" tabId="2" />
          <Tab label="Tab 3" tabId="3" />
          <Tab label="Tab 4" tabId="4" />
        </TabList>
        <TabContent tabId="1">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 1 Content</Card>
        </TabContent>
        <TabContent tabId="2">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 2 Content</Card>
        </TabContent>
        <TabContent tabId="3">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 3 Content</Card>
        </TabContent>
        <TabContent tabId="4">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 4 Content</Card>
        </TabContent>
      </Tabs>
    </Card>
  )
}

export function FluidWidth() {
  const state = useTabState()

  return (
    <Card styleOverrides={{ width: 600 }}>
      <Tabs state={state}>
        <TabList fluid aria-label="my-tabs">
          <Tab label="Tab 1" tabId="1" />
          <Tab label="Tab 2" tabId="2" />
          <Tab label="Tab 3" tabId="3" />
          <Tab label="Tab 4" tabId="4" />
        </TabList>
        <TabContent tabId="1">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 1 Content</Card>
        </TabContent>
        <TabContent tabId="2">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 2 Content</Card>
        </TabContent>
        <TabContent tabId="3">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 3 Content</Card>
        </TabContent>
        <TabContent tabId="4">
          <Card styleOverrides={{ marginTop: 2 }}>Tab 4 Content</Card>
        </TabContent>
      </Tabs>
    </Card>
  )
}

function Header() {
  return (
    <Set
      orientation="vertical"
      fluid
      spacing={5}
      styleOverrides={{ marginTop: 5 }}
    >
      <Heading styleOverrides={{ marginLeft: 4 }}>Provider Manager</Heading>
      <TabList aria-label="my-tabs">
        <Tab label="Pending" tabId="pending" />
        <Tab label="Published" tabId="published" />
      </TabList>
    </Set>
  )
}

function TabsContent() {
  return (
    <Box styles={{ padding: 4 }}>
      <TabContent tabId="published">
        <Card styleOverrides={{ marginTop: 2 }}>Published Content</Card>
      </TabContent>
      <TabContent tabId="pending">
        <Card styleOverrides={{ marginTop: 2 }}>Pending Content</Card>
      </TabContent>
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
