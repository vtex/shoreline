import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import { DataView, DataViewHeader, useDataViewState } from '../../data-view'
import { Table, useTableState } from '../index'
import { Button } from '../../button'
import { createColumns } from '../create-columns'
import { IconTrash, IconPencil } from '@vtex/phosphor-icons'

export default {
  title: 'admin-ui-review/table',
  component: Table,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
  brand: string
}

const initialItems: Item[] = [...Array(20).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
    brand: faker.random.arrayElement(['mistery_id', 'cool_id']),
  }
})

export function WithMenu() {
  const [items, setItems] = useState(initialItems)
  const view = useDataViewState()

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
    {
      id: 'menu',
      resolver: {
        type: 'menu',
        actions: [
          {
            label: 'Edit',
            icon: <IconPencil />,
            onClick: (item) => {
              console.log(item)
            },
          },
          {
            label: 'Delete',
            icon: <IconTrash />,
            onClick: (item) => {
              setItems(items.filter((i) => i.id !== item.id))
            },
          },
        ],
      },
    },
  ])

  const grid = useTableState<Item>({
    view,
    columns,
    items,
  })

  return (
    <DataView csx={{ width: 500 }} state={view}>
      <DataViewHeader>
        <Button onClick={() => view.setStatus({ type: 'ready' })}>Ready</Button>
        <Button onClick={() => view.setStatus({ type: 'loading' })}>
          Loading
        </Button>
      </DataViewHeader>
      <Table state={grid} />
    </DataView>
  )
}
