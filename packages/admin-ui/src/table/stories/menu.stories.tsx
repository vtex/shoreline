import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import { DataView, DataViewHeader, useDataViewState } from '../../data-view'
import {
  useTableState,
  Table,
  TBody,
  TBodyRow,
  THead,
  createColumns,
  THeadCell,
  TBodyCell,
} from '../index'
import { Button } from '../../button'

import { IconTrash, IconPencil } from '@vtex/phosphor-icons'
import { csx } from '@vtex/admin-ui-core'

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

  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    status: view.status,
    columns,
    items,
  })

  return (
    <DataView className={csx({ width: 500 })} state={view}>
      <DataViewHeader>
        <Button onClick={() => view.setStatus({ type: 'ready' })}>Ready</Button>
        <Button onClick={() => view.setStatus({ type: 'loading' })}>
          Loading
        </Button>
      </DataViewHeader>
      <Table {...getTable()}>
        <THead>
          {columns.map((column) => {
            return <THeadCell {...getHeadCell(column)} />
          })}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow key={item.id}>
                {columns.map((column) => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>
      </Table>
    </DataView>
  )
}
