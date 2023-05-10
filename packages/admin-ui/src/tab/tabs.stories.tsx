import React from 'react'
import type { Meta } from '@storybook/react'

import { Tab, TabList, TabPanel, useTabState } from './index'

export default {
  title: 'admin-ui-review/tab',
  component: Tab,
} as Meta

export function Basic() {
  const state = useTabState()

  return (
    <>
      <TabList state={state}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
    </>
  )
}

export function WithPanel() {
  const state = useTabState()

  return (
    <>
      <TabList state={state}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel state={state}>Panel 1</TabPanel>
      <TabPanel state={state}>Panel 2</TabPanel>
    </>
  )
}

export function WithId() {
  const state = useTabState()

  return (
    <>
      <TabList state={state}>
        <Tab id="1">Tab 1</Tab>
        <Tab id="2">Tab 2</Tab>
      </TabList>
      <TabPanel state={state} tabId="1">
        Panel 1
      </TabPanel>
      <TabPanel state={state} tabId="2">
        Panel 2
      </TabPanel>
    </>
  )
}

export function WithDisabled() {
  const state = useTabState()

  return (
    <>
      <TabList state={state}>
        <Tab disabled>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel state={state}>Panel 1</TabPanel>
      <TabPanel state={state}>Panel 2</TabPanel>
    </>
  )
}