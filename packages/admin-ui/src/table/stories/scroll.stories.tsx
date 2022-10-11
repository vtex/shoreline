import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import {
  Table,
  createColumns,
  useTableState,
  TBody,
  TBodyRow,
  THead,
  THeadCell,
  TBodyCell,
} from '../index'

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

  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table {...getTable()} csx={{ height: '100vh' }}>
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
      fixed: true,
      width: 150,
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      width: 900,
    },
  ])

  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table {...getTable()} csx={{ width: '100vw' }}>
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

export function HorizontalAndVerticalScroll() {
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
      width: 200,
      fixed: true,
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
      width: 550,
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      width: 400,
    },
  ])

  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    columns,
    items,
  })

  return (
    <Table {...getTable()} csx={{ height: '100vh', width: '100vw' }}>
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
