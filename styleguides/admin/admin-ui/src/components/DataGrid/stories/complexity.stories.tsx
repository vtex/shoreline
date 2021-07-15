import React from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { DataGrid } from '../index'
import { useDataGridState } from '../hooks/useDataGridState'
import { Column } from '../typings'
import { BaseResolvers } from '../resolvers/base'

export default {
  title: 'admin-ui/DataGrid/complexity',
  component: DataGrid,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const items = [...Array(10).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

const columns: Column<Item, BaseResolvers<Item>>[] = [
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
]

export function Zero() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return <DataGrid state={state} csx={{ width: 560 }} />
}

export function LevelOne() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGrid.Table />
    </DataGrid>
  )
}

export function LevelTwo() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGrid.Table>
        <DataGrid.Table.Head />
        <DataGrid.Table.Body />
      </DataGrid.Table>
    </DataGrid>
  )
}

export function Full() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
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