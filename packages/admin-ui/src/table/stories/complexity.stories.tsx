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

const Example = React.memo(() => {
  const {
    getBodyState,
    getBodyRowState,
    getHeadState,
    getCellState,
    getTableState,
  } = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table {...getTableState()}>
      <TableHead {...getHeadState()} />
      <TableBody {...getBodyState()}>
        <TableBodyRow {...getBodyRowState()}>
          <TableCell {...getCellState()} />
        </TableBodyRow>
      </TableBody>
    </Table>
  )
})

export function Full() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <button
        onClick={() => {
          setCount((p) => p + 1)
        }}
      >
        click {count}
      </button>

      <Example />
    </>
  )
}
