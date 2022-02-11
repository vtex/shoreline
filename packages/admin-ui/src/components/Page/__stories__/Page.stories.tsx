import React, { useState, useEffect } from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'
import faker from 'faker'

import { Page, PageContent, PageHeader, PageTitle, PageActions } from '../index'
import { DataView, DataViewControls, useDataViewState } from '../../DataView'
import { Search, useSearchState } from '../../Search'
import { DataGrid, useDataGridState, createColumns } from '../../DataGrid'
import { Button } from '../../button'

export default {
  title: 'admin-ui/Page',
  component: Page,
} as Meta

export function Basic() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Page Title</PageTitle>
      </PageHeader>
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
      <PageHeader onPopNavigation={() => alert('should go back')}>
        <PageTitle>Page Title</PageTitle>
        <PageActions>
          <Button>Primary Action</Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataView state={view}>
          <DataViewControls>
            <Search
              state={search}
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
