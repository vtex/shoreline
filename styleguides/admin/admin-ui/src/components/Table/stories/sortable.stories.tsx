import React, { useMemo } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { StatefulTable } from '../index'
import { Column } from '../typings'

export default {
  title: 'experimental/Table/Sort',
  component: StatefulTable,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

export function Sortable() {
  const items = useMemo(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  const columns: Column<Item>[] = [
    {
      id: 'name',
      header: 'Product Name',
      sortFns: {
        asc: (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0),
        dsc: (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0),
      },
    },
    {
      id: 'lastSale',
      header: 'Last Sale',
      sortFns: {
        asc: (a, b) => {
          const aLastSale = new Date(a.lastSale).valueOf()
          const bLastSale = new Date(b.lastSale).valueOf()

          return bLastSale - aLastSale
        },
        dsc: (a, b) => {
          const aLastSale = new Date(a.lastSale).valueOf()
          const bLastSale = new Date(b.lastSale).valueOf()

          return aLastSale - bLastSale
        },
      },
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },

      sortFns: {
        asc: (a, b) => parseInt(b.price, 10) - parseInt(a.price, 10),
        dsc: (a, b) => parseInt(a.price, 10) - parseInt(b.price, 10),
      },
    },
  ]

  return <StatefulTable columns={columns} items={items} />
}
