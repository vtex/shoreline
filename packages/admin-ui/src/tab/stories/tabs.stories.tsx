import React from 'react'
import type { Meta } from '@storybook/react'

import { Tab, TabList, TabPanel, TabPanelList, useTabState } from '../index'

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
      <TabPanelList state={state}>
        <TabPanel>Panel 1</TabPanel>
        <TabPanel>Panel 2</TabPanel>
      </TabPanelList>
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
      <TabPanelList state={state}>
        <TabPanel id="1">Panel 1</TabPanel>
        <TabPanel id="2">Panel 2</TabPanel>
      </TabPanelList>
    </>
  )
}
