import React from 'react'

import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderRow,
  PageHeading,
} from '../index'
import { Tab, TabProvider, TabList, TabPanel } from '../../tab'
import { Heading } from '../../heading'
import { Button } from '../../button'
import { IconButton } from '../../icon-button'
import { Bleed } from '../../bleed'
import { Tag } from '../../tag'
import { Stack } from '../../stack'
import { IconArrowLeft } from '@vtex/shoreline-icons'
import { Flex } from '../../flex'

export default {
  title: 'components/page',
}

function getPanelStyle(color: string) {
  return {
    background: `var(--sl-color-${color}-3)`,
    height: '50rem',
    borderRadius: 'var(--sl-radius-3)',
  }
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

export function Show() {
  return (
    <Stack fluid>
      <Page>
        <TabProvider>
          <PageHeader>
            <PageHeaderRow>
              <Flex>
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
              <Bleed top="$space-2" bottom="$space-2">
                <Button variant="primary" size="large">
                  Submit
                </Button>
              </Bleed>
            </PageHeaderRow>
            <PageHeaderRow>
              <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
              </TabList>
            </PageHeaderRow>
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
      <Page>
        <PageHeader>
          <PageHeaderRow>
            <Flex>
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
            <Bleed top="$space-2" bottom="$space-2">
              <Button variant="primary" size="large">
                Submit
              </Button>
            </Bleed>
          </PageHeaderRow>
        </PageHeader>
        <PageContent layout="standard">
          <PlaceholderContent />
        </PageContent>
      </Page>
      <Page>
        <PageHeader>
          <PageHeaderRow>
            <Flex>
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
            <Bleed top="$space-2" bottom="$space-2">
              <Button variant="primary" size="large">
                Submit
              </Button>
            </Bleed>
          </PageHeaderRow>
        </PageHeader>
        <PageContent layout="narrow">
          <PlaceholderContent />
        </PageContent>
      </Page>
      <Page>
        <PageHeader>
          <PageHeaderRow>
            <Flex>
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
          </PageHeaderRow>
        </PageHeader>
        <PageContent layout="standard">
          <PlaceholderContent />
        </PageContent>
      </Page>
      <Page>
        <PageHeader>
          <PageHeading>Title</PageHeading>
        </PageHeader>
        <PageContent layout="wide">
          <PlaceholderContent />
        </PageContent>
      </Page>
      <Page>
        <PageHeader>
          <PageHeaderRow>
            <PageHeading>Title</PageHeading>
            <Bleed top="$space-2" bottom="$space-2">
              <Button variant="primary" size="large">
                Submit
              </Button>
            </Bleed>
          </PageHeaderRow>
        </PageHeader>
        <PageContent layout="standard">
          <PlaceholderContent />
        </PageContent>
      </Page>
    </Stack>
  )
}
