import type { ReactNode } from 'react'
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageHeaderActions,
  PageHeaderBottom,
  PageHeaderTags,
  PageHeaderTag,
  PageHeaderButton,
  PageHeaderMenuButton,
} from './index'
import { Box } from '../box'
import type { TabProps } from '../tab'
import { useTabState, TabPanel, TabList, Tab, TabPanelList } from '../tab'
import type { TagProps } from '../tag'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import { useMenuState, Menu, MenuItem } from '../menu'
import { IconPencil, IconPlus } from '@vtex/phosphor-icons'

const actionOptions: ButtonProps[] = [
  {
    children: 'Edit',
    variant: 'secondary',
  },
  {
    children: 'Create',
  },
]

const tagOptions: TagProps[] = [{ label: 'Short text' }]

const tabOptions: TabProps[] = [
  {
    id: '1',
    children: 'Label',
  },
  {
    id: '2',
    children: 'Label',
  },
  {
    id: '3',
    children: 'Label',
  },
]

export default {
  title: 'admin-ui-review/page/page-header',
  component: PageHeader,
} as Meta

export const Basic: Story<{ title: ReactNode }> = ({ title }) => {
  return (
    <PageHeader>
      <PageHeaderTop>
        <PageHeaderTitle>{title}</PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

Basic.args = {
  title: 'Product #123',
}

export const WithOnPopNavigation: Story<{
  title: ReactNode
  onPopNavigation: () => void
}> = ({ title, onPopNavigation }) => {
  return (
    <PageHeader onPopNavigation={onPopNavigation}>
      <PageHeaderTop>
        <PageHeaderTitle>{title}</PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

WithOnPopNavigation.args = {
  title: 'Product #123',
  onPopNavigation: () => alert('onPopNavigation'),
}

export const WithActions: Story<{
  title: ReactNode
  onPopNavigation: () => void
  actionOptions: ButtonProps[]
}> = ({ title, onPopNavigation, actionOptions }) => {
  return (
    <PageHeader onPopNavigation={onPopNavigation}>
      <PageHeaderTop>
        <PageHeaderTitle>{title}</PageHeaderTitle>
        <PageHeaderActions>
          {actionOptions.map((options) => (
            <PageHeaderButton {...options} />
          ))}
        </PageHeaderActions>
      </PageHeaderTop>
    </PageHeader>
  )
}

WithActions.args = {
  title: 'Product #123',
  onPopNavigation: () => alert('onPopNavigation'),
  actionOptions,
}

export const WithMenu = () => {
  const state = useMenuState()

  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123</PageHeaderTitle>
        <PageHeaderActions>
          {actionOptions.map((options) => (
            <PageHeaderButton {...options} />
          ))}
          <PageHeaderMenuButton state={state} />
          <Menu state={state} aria-label="actions">
            <MenuItem label="Create" icon={<IconPlus />} />
            <MenuItem label="Edit" icon={<IconPencil />} />
          </Menu>
        </PageHeaderActions>
      </PageHeaderTop>
    </PageHeader>
  )
}

export const WithTags: Story<{
  title: ReactNode
  onPopNavigation: () => void
  tagOptions: TagProps[]
}> = ({ title, onPopNavigation, tagOptions }) => {
  return (
    <PageHeader onPopNavigation={onPopNavigation}>
      <PageHeaderTop>
        <PageHeaderTitle>
          {title}
          <PageHeaderTags>
            {tagOptions.map((options) => (
              <PageHeaderTag {...options} />
            ))}
          </PageHeaderTags>
        </PageHeaderTitle>
      </PageHeaderTop>
    </PageHeader>
  )
}

WithTags.args = {
  title: 'Product #123',
  onPopNavigation: () => alert('onPopNavigation'),
  tagOptions,
}

export const WithTabs: Story<{
  title: ReactNode
  onPopNavigation: () => void
  tabOptions: TabProps[]
}> = ({ title, onPopNavigation, tabOptions }) => {
  const tabs = useTabState()

  return <>
    <PageHeader onPopNavigation={onPopNavigation}>
      <PageHeaderTop>
        <PageHeaderTitle>{title}</PageHeaderTitle>
      </PageHeaderTop>
      <PageHeaderBottom>
        <TabList state={tabs}>
          {tabOptions.map((options) => (
            <Tab {...options} />
          ))}
        </TabList>
      </PageHeaderBottom>
    </PageHeader>
    <Box>
      <TabPanelList state={tabs}>
        <TabPanel id="1" csx={{ padding: '$space-3' }}>
          <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
        </TabPanel>
        <TabPanel id="2" csx={{ padding: '$space-3' }}>
          <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
        </TabPanel>
        <TabPanel id="3" csx={{ padding: '$space-3' }}>
          <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
        </TabPanel>
      </TabPanelList>
    </Box>
  </>;
}

WithTabs.args = {
  title: 'Product #123',
  onPopNavigation: () => alert('onPopNavigation'),
  tabOptions,
}

export const FullFledged = () => {
  const tabs = useTabState()
  const state = useMenuState()

  return <>
    <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
      <PageHeaderTop>
        <PageHeaderTitle>
          Product #123
          <PageHeaderTags>
            <PageHeaderTag label="Short text" />
          </PageHeaderTags>
        </PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderButton variant="secondary">Edit</PageHeaderButton>
          <PageHeaderButton>Create</PageHeaderButton>
          <PageHeaderMenuButton state={state} />
          <Menu state={state} aria-label="actions">
            <MenuItem label="Create" icon={<IconPlus />} />
            <MenuItem label="Edit" icon={<IconPencil />} />
          </Menu>
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
    <Box>
      <TabPanelList state={tabs}>
        <TabPanel id="1" csx={{ padding: '$space-3' }}>
          <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
        </TabPanel>
        <TabPanel id="2" csx={{ padding: '$space-3' }}>
          <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
        </TabPanel>
        <TabPanel id="3" csx={{ padding: '$space-3' }}>
          <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
        </TabPanel>
      </TabPanelList>
    </Box>
  </>;
}
