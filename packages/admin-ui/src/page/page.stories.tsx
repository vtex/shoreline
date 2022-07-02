import React, { useState, useEffect } from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'
import faker from 'faker'

import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageHeaderActions,
  PageHeaderBottom,
} from './index'
import { useTabState, TabPanel, TabList, Tab, TabPanelList } from '../tab'
import {
  DataView,
  DataViewControls,
  useDataViewState,
} from '../components/DataView'
import { Search, useSearchState } from '../search'
import {
  DataGrid,
  useDataGridState,
  createColumns,
} from '../components/DataGrid'
import { Box } from '../box'
import { Tag } from '../tag'
import { Button } from '../button'
import { Stack } from '../stack'

export default {
  title: 'admin-ui-review/page',
} as Meta

export function Basic() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>Page content</PageContent>
    </Page>
  )
}

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const items: Item[] = [...Array(20).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

const columns = createColumns<Item>([
  {
    id: 'name',
    header: 'Product Name',
  },
  {
    id: 'lastSale',
    header: 'Last Sale',
  },
  {
    id: 'price',
    header: 'Price',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
])

export function WithDataView() {
  const [data, setData] = useState(items)
  const view = useDataViewState()
  const search = useSearchState()
  const grid = useDataGridState<Item>({
    view,
    columns,
    items: data,
  })

  useEffect(() => {
    if (search.debouncedValue !== '') {
      setData(
        items.filter((item) =>
          item.name
            .toLowerCase()
            .startsWith(search.debouncedValue.toLowerCase())
        )
      )
    } else {
      setData(items)
    }
  }, [search.debouncedValue])

  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>
        <DataView state={view}>
          <DataViewControls>
            <Search
              id="search"
              aria-label="DataGrid Search"
              placeholder="Search by name"
            />
          </DataViewControls>
          <DataGrid state={grid} />
        </DataView>
      </PageContent>
    </Page>
  )
}

function Placeholder() {
  return (
    <Box
      csx={{
        height: '80vh',
        bg: '$secondary',
      }}
    />
  )
}

export function Standard() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent>
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}

export function Narrow() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="narrow">
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}

export function Wide() {
  return (
    <Page>
      <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
        <PageHeaderTop>
          <PageHeaderTitle>Product #123 </PageHeaderTitle>
        </PageHeaderTop>
      </PageHeader>
      <PageContent layout="wide">
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}

export function FullFledged() {
  const tabs = useTabState()
  const [data, setData] = useState(items)
  const view = useDataViewState()
  const search = useSearchState()
  const grid = useDataGridState<Item>({
    view,
    columns,
    items: data,
  })

  useEffect(() => {
    if (search.debouncedValue !== '') {
      setData(
        items.filter((item) =>
          item.name
            .toLowerCase()
            .startsWith(search.debouncedValue.toLowerCase())
        )
      )
    } else {
      setData(items)
    }
  }, [search.debouncedValue])

  return (
    <Page>
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
            <Button variant="critical" size="large">
              Delete item
            </Button>
            <Button variant="secondary" size="large">
              Edit
            </Button>
            <Button size="large">Create</Button>
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
      <PageContent layout="wide">
        <TabPanelList state={tabs}>
          <TabPanel id="1">
            <DataView state={view}>
              <DataViewControls>
                <Search
                  id="search"
                  aria-label="DataGrid Search"
                  placeholder="Search by name"
                />
              </DataViewControls>
              <DataGrid state={grid} />
            </DataView>
          </TabPanel>
          <TabPanel id="2">
            <Placeholder />
          </TabPanel>
          <TabPanel id="3">
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </TabPanel>
        </TabPanelList>
      </PageContent>
    </Page>
  )
}
