import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import {
  Table,
  TableBody,
  TableBodyRow,
  TableHead,
  TableCell,
  createColumns,
} from '../index'
import { useTableState } from '../hooks/use-table-state'
import { DataView, useDataViewState } from '../../data-view'

export default {
  title: 'admin-ui-review/table/complexity',
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

export function Zero() {
  const state = useTableState<Item>({
    columns,
    items,
  })

  return <Table state={state} csx={{ width: 560 }} />
}

export function LevelOne() {
  const view = useDataViewState()
  const grid = useTableState<Item>({
    columns,
    items,
    view,
  })

  return (
    <DataView state={view}>
      <Table state={grid} csx={{ width: 560 }} />
    </DataView>
  )
}

export function LevelTwo() {
  const state = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table state={state} csx={{ width: 560 }}>
      <TableHead />
      <TableBody />
    </Table>
  )
}

export function Full() {
  const state = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table state={state} csx={{ width: 560 }}>
      <TableHead>
        <TableCell />
      </TableHead>
      <TableBody>
        <TableBodyRow>
          <TableCell />
        </TableBodyRow>
      </TableBody>
    </Table>
  )
}
