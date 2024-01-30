import React from 'react'

import { Page, PageContent, PageHeader, PageHeading } from '../index'
import { Tab, TabProvider, TabList, TabPanel } from '../../tab'
import { Flex } from '../../flex'
import { Heading } from '../../heading'
import { Button } from '../../button'
import { IconButton } from '../../icon-button'
import { Bleed } from '../../bleed'
import { Tag } from '../../tag'
import { Slot } from '../../slot'
import { IconArrowLeft } from '@vtex/shoreline-icons'
import type { StoryObj } from '@storybook/react'

import './page.stories.css'

export default {
  title: 'components/page',
  argTypes: {
    layout: {
      control: 'select',
      options: ['standard', 'wide', 'narrow'],
      description: 'Page content layout type',
    },
    pageHeading: {
      control: 'text',
      description: 'Title of a page',
    },
    headerWithTabs: {
      control: 'boolean',
      description: 'Whether to render tabs example or not',
    },
    headerWithButton: {
      control: 'boolean',
      description: 'Whether to render tabs example or not',
    },
    headerWithTag: {
      control: 'boolean',
      description: 'Whether to render tags example or not',
    },
  },
  args: {
    layout: 'standard',
    pageHeading: 'Page title',
    headerWithTabs: false,
    headerWithButton: false,
    headerWithTag: false,
    headerWithBackButton: false,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as StoryObj<StoryArgs>

interface StoryArgs {
  layout: 'standard' | 'wide' | 'narrow'
  pageHeading: string
  headerWithTabs: boolean
  headerWithButton: boolean
  headerWithTag: boolean
  headerWithBackButton: boolean
}

/**
 * @guideline
 */
function PageHeaderButton() {
  return (
    <Bleed top="$space-2" bottom="$space-2" className="ph-header-element">
      <Button variant="primary" className="ph-header-button" size="large">
        Submit
      </Button>
    </Bleed>
  )
}

/**
 * @guideline
 */
function CompletePageHeading(args: StoryArgs) {
  return (
    <>
      {args.headerWithBackButton && (
        <Bleed top="$space-2" bottom="$space-2">
          <IconButton label="Return" asChild variant="tertiary" size="large">
            <IconArrowLeft />
          </IconButton>
        </Bleed>
      )}
      <PageHeading>{args.pageHeading}</PageHeading>
      {args.headerWithTag && <Tag variant="secondary">Short text</Tag>}
    </>
  )
}

export function Play(args: StoryArgs) {
  if (args.headerWithTabs) {
    return (
      <Slot className="ph-decorative-box">
        <WithTabs {...args} />
      </Slot>
    )
  }

  return (
    <Slot className="ph-decorative-box">
      <Page>
        <PageHeader>
          <Flex justify="space-between">
            <Flex
              gap="var(--sl-space-2)"
              align="center"
              className="ph-header-element"
            >
              <CompletePageHeading {...args} />
            </Flex>
            {args.headerWithButton && <PageHeaderButton />}
          </Flex>
        </PageHeader>
        <PageContent layout={args.layout}>
          <div
            style={{
              background: 'var(--sl-color-gray-3)',
              height: '100rem',
              width: '100%',
            }}
          />
        </PageContent>
      </Page>
    </Slot>
  )
}

function getPanelStyle(color: string) {
  return {
    background: `var(--sl-color-${color}-3)`,
    height: '50rem',
    borderRadius: 'var(--sl-border-radius-large)',
  }
}

/**
 * @guideline
 */
function WithTabs(args: StoryArgs) {
  return (
    <Page>
      <TabProvider>
        <PageHeader className="ph-with-tabs">
          <Flex justify="space-between">
            <Flex
              gap="var(--sl-space-2)"
              align="center"
              className="ph-header-element"
            >
              <CompletePageHeading {...args} />
            </Flex>
            {args.headerWithButton && <PageHeaderButton />}
          </Flex>
          <Flex className="ph-tab-list">
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