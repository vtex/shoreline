import React from 'react'

import { Page, PageContent, PageHeader, PageHeading } from '../index'
import { Tab, TabProvider, TabList, TabPanel } from '../../tab'
import { Flex } from '../../flex'
import { Heading } from '../../heading'
import { Button } from '../../button'
import { IconButton } from '../../icon-button'
import { Bleed } from '../../bleed'
import { Tag } from '../../tag'
import { IconArrowLeft } from '@vtex/shoreline-icons'

import './page.stories.css'

export default {
  title: 'components/page',
}

function getPanelStyle(color: string) {
  return {
    background: `var(--sl-color-${color}-3)`,
    height: '50rem',
    borderRadius: 'var(--sl-border-radius-large)',
  }
}

export function Show() {
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
              <PageHeading>Title</PageHeading>
              <Tag variant="secondary">Short text</Tag>
            </Flex>
            <Bleed
              top="$space-2"
              bottom="$space-2"
              className="ph-header-element"
            >
              <Button
                variant="primary"
                className="ph-header-button"
                size="large"
              >
                Submit
              </Button>
            </Bleed>
          </Flex>
          <Flex className="ph-tab-list">
            <TabList>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>
          </Flex>
        </PageHeader>
        <PageContent layout="standard">
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
