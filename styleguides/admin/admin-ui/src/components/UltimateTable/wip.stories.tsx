import React, { useMemo } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { DataGrid } from './index'
import { useDataGridState } from './hooks/useDataGridState'

export default {
  title: 'admin-ui/DataGrid',
  component: DataGrid,
} as Meta

export function Basic() {
  interface Item {
    id: string
    name: string
    lastSale: string
    price: string
  }

  const items = useMemo<Item[]>(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const state = useDataGridState<Item>({
    columns: [
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
    ],
    items,
  })

  return <DataGrid state={state} csx={{ width: 560 }} />
}

export function Wip() {
  interface Item {
    id: string
    name: string
    lastSale: string
    price: string
  }

  const items = useMemo<Item[]>(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const state = useDataGridState<Item>({
    columns: [
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
    ],
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGrid.Toolbar>
        <DataGrid.Toolbar.Button
          onClick={() =>
            state.setStatus({
              type: 'ready',
            })
          }
        >
          Ready
        </DataGrid.Toolbar.Button>

        <DataGrid.Toolbar.Button
          onClick={() =>
            state.setStatus({
              type: 'loading',
            })
          }
        >
          Loading
        </DataGrid.Toolbar.Button>

        <DataGrid.Toolbar.Button
          onClick={() =>
            state.setStatus({
              type: 'error',
              message: 'Something went wrong',
            })
          }
        >
          Error
        </DataGrid.Toolbar.Button>

        <DataGrid.Toolbar.Button
          onClick={() =>
            state.setStatus({
              type: 'not-found',
              message: 'Your product was not found',
            })
          }
        >
          Not Found
        </DataGrid.Toolbar.Button>

        <DataGrid.Toolbar.Button
          onClick={() =>
            state.setStatus({
              type: 'empty',
              message: 'You need to create something',
            })
          }
        >
          Empty
        </DataGrid.Toolbar.Button>
      </DataGrid.Toolbar>

      <DataGrid.Table>
        <DataGrid.Table.Head>
          <DataGrid.Table.Cell />
        </DataGrid.Table.Head>
        <DataGrid.Table.Body>
          <DataGrid.Table.Body.Row>
            <DataGrid.Table.Cell />
          </DataGrid.Table.Body.Row>
        </DataGrid.Table.Body>
      </DataGrid.Table>
    </DataGrid>
  )
}

export function Sortable() {
  const items = useMemo(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const state = useDataGridState({
    columns: [
      {
        id: 'name',
        header: 'Product Name',
        compare: (a, b) => b.name.localeCompare(a.name),
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
        compare: (a, b) => parseInt(b.price, 10) - parseInt(a.price, 10),
      },
    ],
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGrid.Section>
        <DataGrid.Search id="search" placeholder="Search" />
      </DataGrid.Section>
      <DataGrid.Table>
        <DataGrid.Table.Head />
        <DataGrid.Table.Body />
      </DataGrid.Table>
    </DataGrid>
  )
}
