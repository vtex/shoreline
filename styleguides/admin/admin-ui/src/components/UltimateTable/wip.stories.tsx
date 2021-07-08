import React, { useMemo } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { DataGrid } from './index'
import { useDataGridState } from './hooks/useDataGridState'
import { Button } from '../Button'

export default {
  title: 'admin-ui/DataGrid',
  component: DataGrid,
} as Meta

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
      <DataGrid.Section>
        <Button
          onClick={() =>
            state.setStatus({
              type: 'ready',
            })
          }
        >
          Ready
        </Button>

        <Button
          onClick={() =>
            state.setStatus({
              type: 'loading',
            })
          }
        >
          Loading
        </Button>

        <Button
          onClick={() =>
            state.setStatus({
              type: 'error',
              message: 'Something went wrong'
            })
          }
        >
          Error
        </Button>

        <Button
          onClick={() =>
            state.setStatus({
              type: 'not-found',
              message: 'Your product was not found'
            })
          }
        >
          Not Found
        </Button>

        <Button
          onClick={() =>
            state.setStatus({
              type: 'empty',
              message: 'You need to create something'
            })
          }
        >
          Empty
        </Button>
      </DataGrid.Section>

      <DataGrid.Toolbar>
        <DataGrid.Toolbar.Button>Toolbar button</DataGrid.Toolbar.Button>
        <DataGrid.Toolbar.Button>Toolbar button</DataGrid.Toolbar.Button>
        <DataGrid.Toolbar.Button>Toolbar button</DataGrid.Toolbar.Button>
      </DataGrid.Toolbar>

      <DataGrid.Table>
        <DataGrid.Table.Head>
          <DataGrid.Table.Cell />
        </DataGrid.Table.Head>
        <DataGrid.Table.Body>
          <DataGrid.Table.Row onClick={(item) => console.log(item)}>
            <DataGrid.Table.Cell />
          </DataGrid.Table.Row>
        </DataGrid.Table.Body>
      </DataGrid.Table>
    </DataGrid>
  )
}
