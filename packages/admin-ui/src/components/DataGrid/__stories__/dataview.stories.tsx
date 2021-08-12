import React, { useEffect, useState } from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import { DataView, DataViewControls, useDataViewState } from '../../DataView'
import { DataGrid, useDataGridState } from '../index'
import { Button } from '../../Button'
import { useSearchState, Search } from '../../Search'
import { createColumns } from '../createColumns'

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
