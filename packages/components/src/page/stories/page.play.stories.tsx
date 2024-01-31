import React from 'react'

import { Page, PageContent, PageHeader, PageHeading } from '../index'
import { Tab, TabProvider, TabList, TabPanel } from '../../tab'
import { Heading } from '../../heading'
import { Button } from '../../button'
import { IconButton } from '../../icon-button'
import { Bleed } from '../../bleed'
import { Tag } from '../../tag'
import { Slot } from '../../slot'
import { IconArrowLeft } from '@vtex/shoreline-icons'
import type { StoryObj } from '@storybook/react'

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
    withTabs: {
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
    withTabs: false,
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
  withTabs: boolean
  headerWithButton: boolean
  headerWithTag: boolean
  headerWithBackButton: boolean
}

function PlaceholderContent() {
  return (
    <div
      style={{
        background: 'var(--sl-color-gray-3)',
        height: '100rem',
        width: '100%',
      }}
    />
  )
}

export function Play(args: StoryArgs) {
  return (
    <Page>
      <TabProvider defaultSelectedId="selected">
        <PageHeader>
          <Slot name="top">
            <Slot name="left">
              {args.headerWithBackButton && (
                <Bleed top="$space-2" bottom="$space-2">
                  <IconButton
                    label="Return"
                    asChild
                    variant="tertiary"
                    size="large"
                  >
                    <IconArrowLeft />
                  </IconButton>
                </Bleed>
              )}
              <PageHeading>{args.pageHeading}</PageHeading>
              {args.headerWithTag && <Tag variant="secondary">Short text</Tag>}
            </Slot>
            {args.headerWithButton && (
              <Bleed top="$space-2" bottom="$space-2">
                <Button
                  variant="primary"
                  className="ph-header-button"
                  size="large"
                >
                  Submit
                </Button>
              </Bleed>
            )}
          </Slot>
          <Slot name="bottom">
            {args.withTabs && (
              <TabList defaultChecked>
                <Tab id="selected">Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
              </TabList>
            )}
          </Slot>
        </PageHeader>
        <PageContent layout={args.layout}>
          {args.withTabs ? (
            <>
              <TabPanel style={getPanelStyle('teal')} tabId="selected">
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
            </>
          ) : (
            <PlaceholderContent />
          )}
        </PageContent>
      </TabProvider>
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
