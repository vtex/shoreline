import React, { useState, useEffect } from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'
import faker from 'faker'

import { Page, PageContent, PageHeader } from './index'
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

export default {
  title: 'admin-ui-review/page',
} as Meta

export function Basic() {
  return (
    <Page>
      <PageHeader title="Page Title" />
      <PageContent>
        <tag.div>Page Content</tag.div>
      </PageContent>
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
      <PageHeader
        title="Page Title"
        onPopNavigation={() => alert('should go back')}
        actionOptions={[
          {
            children: 'Primary Action',
          },
        ]}
      />
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
      <PageHeader title="Page Title" />
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
      <PageHeader title="Page Title" />
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
      <PageHeader title="Page Title" />
      <PageContent layout="wide">
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </PageContent>
    </Page>
  )
}
