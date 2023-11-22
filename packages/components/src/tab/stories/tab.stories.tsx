import React from 'react'

import { Tab, TabProvider, TabList, TabPanel } from '../index'

export default {
  title: 'shoreline-components/tab',
}

export function Default() {
  return (
    <TabProvider>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Tab 1</TabPanel>
      <TabPanel>Tab 2</TabPanel>
      <TabPanel>Tab 3</TabPanel>
    </TabProvider>
  )
}

export function DefaultSelectedTab() {
  return (
    <TabProvider defaultSelectedId="selected">
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab id="selected">Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>
      <TabPanel>Tab 1</TabPanel>
      <TabPanel tabId="selected">Tab 2</TabPanel>
      <TabPanel>Tab 3</TabPanel>
    </TabProvider>
  )
}
