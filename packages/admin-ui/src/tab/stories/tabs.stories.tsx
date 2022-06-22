import React from 'react'
import type { Meta } from '@storybook/react'

import { Tab, TabList, useTabState } from '../index'

export default {
  title: 'admin-ui-review/tab',
  component: Tab,
} as Meta

export function Basic() {
  const state = useTabState()

  return (
    <TabList state={state} aria-label="my-tabs">
      <Tab id="1">Tab 1</Tab>
      <Tab id="2">Tab 2</Tab>
      <Tab id="3">Tab 3</Tab>
      <Tab id="4">Tab 4</Tab>
    </TabList>
  )
}
