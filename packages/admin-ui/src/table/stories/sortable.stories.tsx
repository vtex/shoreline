import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'
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
import { csx } from '@vtex/admin-ui-core'

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
  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table {...getTable()} className={csx({ width: 560 })}>
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
  )
}
