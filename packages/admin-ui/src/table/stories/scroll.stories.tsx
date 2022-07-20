import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import { Table, createColumns } from '../index'
import { useTableState } from '../hooks/use-table-state'

export default {
  title: 'admin-ui-review/table/scroll',
  component: Table,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

export function VerticalScroll() {
  const items = [...Array(100).keys()].map((id) => {
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

  const state = useTableState<Item>({
    columns,
    items,
    onRowClick: (item) => alert(`Row clicked: ${item.name}`),
  })

  return <Table state={state} csx={{ width: 560 }} />
}

export function HorizontalScroll() {
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
      width: 200,
      fixed: true,
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
      width: 900,
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      width: 150,
    },
  ])

  const state = useTableState<Item>({
    columns,
    items,
    onRowClick: (item) => alert(`Row clicked: ${item.name}`),
  })

  return <Table state={state} />
}
