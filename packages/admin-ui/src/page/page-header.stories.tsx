import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import type { PageHeaderProps } from './index'
import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageHeaderActions,
  PageHeaderBottom,
} from './index'
import { useTabState, TabPanel, TabList, Tab, TabPanelList } from '../tab'
import { Tag } from '../tag'
import { Button } from '../button'
import { Stack } from '../stack'

export default {
  title: 'admin-ui-review/page/page-header',
  component: PageHeader,
} as Meta

export const Playground: Story<PageHeaderProps> = (args) => {
  return <PageHeader {...args} />
}

export function Basic() {
  return (
    <PageHeader>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123</PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

export function WithOnPopNavigation() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123</PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

export function WithActions() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123</PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="critical" size="large" bleedY>
            Delete item
          </Button>
          <Button variant="secondary" size="large" bleedY>
            Edit
          </Button>
          <Button size="large" bleedY>
            Create
          </Button>
        </PageHeaderActions>
      </PageHeaderTop>
    </PageHeader>
  )
}

export function WithTags() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
      <PageHeaderTop>
        <PageHeaderTitle>
          Product #123
          <Stack direction="row" space="$m">
            <Tag label="Short text" size="large" />
            <Tag label="Short text" size="large" />
          </Stack>
        </PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

export function WithTabs() {
  const tabs = useTabState()

  return (
    <>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123</PageHeaderTitle>
        </PageHeaderTop>
        <PageHeaderBottom>
          <TabList state={tabs}>
            <Tab id="1">Label</Tab>
            <Tab id="2">Label</Tab>
            <Tab id="3">Label</Tab>
          </TabList>
        </PageHeaderBottom>
      </PageHeader>
      <tag.div>
        <TabPanelList state={tabs}>
          <TabPanel id="1" csx={{ padding: 3 }}>
            <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
          </TabPanel>
          <TabPanel id="2" csx={{ padding: 3 }}>
            <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
          </TabPanel>
          <TabPanel id="3" csx={{ padding: 3 }}>
            <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
          </TabPanel>
        </TabPanelList>
      </tag.div>
    </>
  )
}

export function FullFledged() {
  const tabs = useTabState()

  return (
    <>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>
            Product #123{' '}
            <Stack direction="row" space="$m">
              <Tag label="Short text" size="large" />
              <Tag label="Short text" size="large" />
            </Stack>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button variant="critical" size="large" bleedY>
              Delete item
            </Button>
            <Button variant="secondary" size="large" bleedY>
              Edit
            </Button>
            <Button size="large" bleedY>
              Create
            </Button>
          </PageHeaderActions>
        </PageHeaderTop>
        <PageHeaderBottom>
          <TabList state={tabs}>
            <Tab id="1">Label</Tab>
            <Tab id="2">Label</Tab>
            <Tab id="3">Label</Tab>
          </TabList>
        </PageHeaderBottom>
      </PageHeader>
      <tag.div>
        <TabPanelList state={tabs}>
          <TabPanel id="1" csx={{ padding: 3 }}>
            <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
          </TabPanel>
          <TabPanel id="2" csx={{ padding: 3 }}>
            <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
          </TabPanel>
          <TabPanel id="3" csx={{ padding: 3 }}>
            <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
          </TabPanel>
        </TabPanelList>
      </tag.div>
    </>
  )
}
