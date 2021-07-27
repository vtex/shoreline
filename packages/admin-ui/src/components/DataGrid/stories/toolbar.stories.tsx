import React from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'
import { IconDevConsole } from '@vtex/admin-ui-icons'

import { DataGrid } from '../index'
import { useDataGridState } from '../hooks/useDataGridState'
import { DataGridColumn } from '../typings'
import { BaseResolvers } from '../resolvers/base'

export default {
  title: 'admin-ui/DataGrid/toolbar',
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

const columns: DataGridColumn<Item, BaseResolvers<Item>>[] = [
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

export function WithButtons() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGrid.Toolbar>
        <DataGrid.Toolbar.Button icon={<IconDevConsole />}>Download Code</DataGrid.Toolbar.Button>
      </DataGrid.Toolbar>
      <DataGrid.Table />
    </DataGrid>
  )
}