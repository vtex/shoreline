import React, { useMemo } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { UltimateTable as Table } from './index'
import { useTableState } from './hooks/useTableState'

export default {
  title: 'admin-ui/UltimateTable',
  component: Table,
} as Meta

export function Wip() {
  interface Item {
    id: string
    name: string
    lastSale: string
    price: string
  }

  const items = useMemo<Item[]>(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const state = useTableState<Item>({
    columns: [
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
    ],
    items,
  })

  return (
    <Table state={state} csx={{ width: 560 }}>
      <Table.Head>
        <Table.Cell />
      </Table.Head>
      <Table.Body>
        <Table.Row onClick={item => console.log(item)}>
          <Table.Cell />
        </Table.Row>
      </Table.Body>
    </Table>
  )
}