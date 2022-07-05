import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import { Table } from '../index'
import { useTableState } from '../hooks/use-table-state'
import { createColumns } from '../create-columns'

export default {
  title: 'admin-ui-review/table/sortable',
  component: Table,
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

const columns = createColumns<Item>([
  {
    id: 'name',
    header: 'Product Name',
    compare: (a, b) => a.name.localeCompare(b.name),
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
    compare: (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
  },
])

export function CompareFunction() {
  const grid = useTableState<Item>({
    columns,
    items,
  })

  return <Table state={grid} csx={{ width: 560 }} />
}
