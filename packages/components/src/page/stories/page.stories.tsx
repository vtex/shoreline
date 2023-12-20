import React from 'react'

import { Page, PageContent, PageHeader, PageTitle } from '../index'
import { Tab, TabProvider, TabList, TabPanel } from '../../tab'
import { Flex } from '../../flex'
import { Heading } from '../../heading'
import type { StoryObj } from '@storybook/react'

export default {
  title: 'shoreline-components/page',
  argTypes: {
    layout: {
      control: 'select',
      options: ['standard', 'wide', 'narrow'],
      description: 'Page content layout type',
    },
    pageTitle: {
      control: 'text',
      description: 'Title of a page',
    },
    withTabs: {
      control: 'boolean',
      description: 'Whether to render tabs example or not',
    },
  },
  args: {
    layout: 'standard',
    pageTitle: 'Page title',
    withTabs: false,
  },
} as StoryObj<StoryArgs>

interface StoryArgs {
  layout: 'standard' | 'wide' | 'narrow'
  pageTitle: string
  withTabs: boolean
}

export function Playground(args: StoryArgs) {
  if (args.withTabs) {
    return <WithTabs {...args} />
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>{args.pageTitle}</PageTitle>
      </PageHeader>
      <PageContent layout={args.layout}>
        <div
          style={{
            background: 'var(--sl-bg-muted)',
            height: '100rem',
            width: '100%',
          }}
        />
      </PageContent>
    </Page>
  )
}

function getPanelStyle(color: string) {
  return {
    background: `var(--sl-color-${color}-3)`,
    height: '50rem',
    borderRadius: 'var(--sl-border-radius-large)',
  }
}

export function WithTabs(args: StoryArgs) {
  return (
    <Page>
      <TabProvider>
        <PageHeader>
          <Flex>
            <PageTitle>{args.pageTitle}</PageTitle>
          </Flex>
          <Flex>
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
          </Flex>
        </PageHeader>
        <PageContent layout={args.layout}>
          <TabPanel style={getPanelStyle('teal')}>
            <Heading level={2} variant="display2">
              Tab 1
            </Heading>
          </TabPanel>
          <TabPanel style={getPanelStyle('blue')}>
            <Heading level={2} variant="display2">
              Tab 2
            </Heading>
          </TabPanel>
          <TabPanel style={getPanelStyle('purple')}>
            <Heading level={2} variant="display2">
              Tab 3
            </Heading>
          </TabPanel>
        </PageContent>
      </TabProvider>
    </Page>
  )
}
