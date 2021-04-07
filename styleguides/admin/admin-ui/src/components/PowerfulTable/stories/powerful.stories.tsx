import React, { useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import faker from 'faker'

import { PowerfulTable } from '../index'

export default {
  title: 'admin-ui/Table/Powerful',
  component: PowerfulTable,
} as Meta

const items = [...Array(10).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

export function Simple() {
  const [searchValue, setSearchValue] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return (
        item.name.includes(searchValue) ||
        item.lastSale.includes(searchValue) ||
        item.price.includes(searchValue)
      )
    })
  }, [searchValue])

  return (
    <PowerfulTable
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
      items={filteredItems}
    >
      <PowerfulTable.Toolbar
        onSearch={setSearchValue}
        onExport={() => {}}
        onImport={() => {}}
      />
    </PowerfulTable>
  )
}
