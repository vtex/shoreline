import React from 'react'

import { Page, PageContent, PageHeader, PageTitle } from '../index'
import { Tab, TabProvider, TabList, TabPanel } from '../../tab'
import { Flex } from '../../flex'
import { Heading } from '../../heading'

export default {
  title: 'shoreline-components/page',
  argTypes: {
    layout: {
      control: 'select',
      options: ['standard', 'wide', 'narrow'],
      description: 'Page content layout type',
    },
  },
  args: {
    layout: 'standard',
  },
}

interface StoryArgs {
  layout: 'standard' | 'wide' | 'narrow'
}

export function Default(args: StoryArgs) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Page title</PageTitle>
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
            <PageTitle>Page title</PageTitle>
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
