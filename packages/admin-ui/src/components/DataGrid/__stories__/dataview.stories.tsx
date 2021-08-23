import React, { useEffect, useState } from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'
import { FlexSpacer } from '@vtex/admin-primitives'
import { QueryStateProvider } from '@vtex/onda-hooks'

import { DataView, DataViewControls, useDataViewState } from '../../DataView'
import { DataGrid, useDataGridState } from '../index'
import { Button } from '../../Button'
import { useSearchState, Search, useQuerySearchState } from '../../Search'
import { createColumns } from '../createColumns'
import { Pagination, useQueryPaginationState } from '../../Pagination'
import { Set } from '../../Set'
import { Input } from '../../Input'

export default {
  title: 'admin-ui/DataGrid/WithDataView',
  component: DataGrid,
} as Meta

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

export function SearchControls() {
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
    <DataView csx={{ width: 500 }} state={view}>
      <DataViewControls>
        <Search
          state={search}
          id="search"
          aria-label="DataGrid Search"
          placeholder="Search by name"
          csx={{
            width: 'full',
          }}
        />
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

export function Status() {
  const view = useDataViewState()
  const grid = useDataGridState<Item>({
    view,
    columns,
    items,
  })

  return (
    <DataView csx={{ width: 500 }} state={view}>
      <DataViewControls>
        <Button onClick={() => view.setStatus({ type: 'ready' })}>Ready</Button>
        <Button onClick={() => view.setStatus({ type: 'loading' })}>
          Loading
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'error',
              message: 'Something went wrong',
              action: {
                text: 'Try again',
                onClick: () => alert('Clicked'),
              },
            })
          }
        >
          Error
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'not-found',
              message: 'The params do not match',
              suggestion: 'Try a different text',
            })
          }
        >
          Not Found
        </Button>
        <Button
          onClick={() =>
            view.setStatus({
              type: 'empty',
              message: 'You do not have any product yet',
              action: {
                text: 'Create one',
                onClick: () => alert('Clicked'),
              },
            })
          }
        >
          Empty
        </Button>
      </DataViewControls>
      <DataGrid state={grid} />
    </DataView>
  )
}

const items2: Item[] = [...Array(50).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

export function QueryState() {
  const [data, setData] = useState(items2)
  const view = useDataViewState()
  const pagination = useQueryPaginationState({
    pageSize: 5,
    total: items2.length,
  })

  const search = useQuerySearchState({})
  const grid = useDataGridState<Item>({
    view,
    columns,
    items: data.slice(pagination.range[0] - 1, pagination.range[1]),
  })

  useEffect(() => {
    if (search.debouncedValue !== '') {
      const filtredItems = items2.filter((item) =>
        item.name.toLowerCase().startsWith(search.debouncedValue.toLowerCase())
      )

      setData(filtredItems)
      pagination.paginate({ type: 'setTotal', total: filtredItems.length })
      pagination.paginate({ type: 'reset' })
    } else {
      setData(items2)
      pagination.paginate({ type: 'setTotal', total: items2.length })
      pagination.paginate({ type: 'reset' })
    }
  }, [search.debouncedValue])

  return (
    <QueryStateProvider>
      <Set orientation="vertical" spacing={6}>
        <Input
          label="Current URL:"
          id="current-url-input"
          value={window.location.href}
          disabled
          csx={{ width: 'lg' }}
          helperText="You can copy the part with page and search in your URL to see the page load directly with persisted states"
        />
        <DataView csx={{ width: 500 }} state={view}>
          <DataViewControls>
            <Search id="search" placeholder="search" state={search} />
            <FlexSpacer />
            <Pagination
              state={pagination}
              preposition="of"
              subject="results"
              prevLabel="Previous"
              nextLabel="Next"
            />
          </DataViewControls>
          <DataGrid state={grid} />
        </DataView>
      </Set>
    </QueryStateProvider>
  )
}
