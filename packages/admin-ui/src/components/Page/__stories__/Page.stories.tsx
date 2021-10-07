import React, { useState, useEffect } from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'
import faker from 'faker'
import { merge } from '@vtex/admin-ui-util'
import { unstableCreateAdminUI, theme, createSystem } from '@vtex/admin-ui-core'

import { Page, PageContent, PageHeader, PageTitle, PageActions } from '../index'
import { DataView, DataViewControls, useDataViewState } from '../../DataView'
import { Search, useSearchState } from '../../Search'
import { DataGrid, useDataGridState, createColumns } from '../../DataGrid'
import { Button } from '../../Button'

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

export const colors = {
  orange05: 'hsla(30, 100%, 96%, 1)',
  orange10: 'hsla(30, 100%, 92%, 1)',
  orange20: 'hsla(30, 100%, 80%, 1)',
  orange30: 'hsla(30, 100%, 69%, 1)',
  orange40: 'hsla(30, 100%, 45%, 1)',
  orange50: 'hsla(30, 100%, 35%, 1)',
  orange60: 'hsla(29, 100%, 18%, 1)',
}

const unstableSystem = unstableCreateAdminUI(
  merge(theme, {
    background: {
      base: theme.colors.grey80,
      action: {
        primary: colors.orange10,
        primaryHover: colors.orange20,
        primaryPressed: colors.orange30,

        tertiaryHover: colors.orange05,
        tertiaryPressed: colors.orange10,
      },
    },
    foreground: {
      base: theme.colors.white,
      action: {
        primary: colors.orange50,
        tertiary: colors.orange10,
      },
    },
    borderColor: {
      base: theme.colors.grey60,
    },
  })
)

const [AdminUIDark] = createSystem({
  key: 'night-owl',
  unstableSystem,
})

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
    <AdminUIDark>
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
    </AdminUIDark>
  )
}
