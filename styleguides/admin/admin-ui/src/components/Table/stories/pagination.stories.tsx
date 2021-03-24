import React, { useMemo } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { StatefulTable } from '../index'

export default {
  title: 'admin-ui/Table/Pagination',
  component: StatefulTable,
} as Meta

export function Simple() {
  const items = useMemo(() => {
    return [...Array(1000).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      }
    })
  }, [])

  return (
    <StatefulTable
      columns={[
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
      ]}
      items={items}
      length={10}
    />
  )
}
