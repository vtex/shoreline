import React from 'react'
import { Meta } from '@storybook/react'

import { PowerfulTable } from '../index'

export default {
  title: 'admin-ui/Table/Powerful',
  component: PowerfulTable,
} as Meta

export function Simple() {
  const fruits = [
    {
      id: 1,
      productName: 'Orange',
      inStock: 380,
      skus: 0,
      price: 120,
    },
    {
      id: 2,
      productName: 'Lemon',
      inStock: 380,
      skus: 26,
      price: 120,
    },
    {
      id: 3,
      productName: 'Tomato',
      inStock: 380,
      skus: 26,
      price: 120,
    },
  ]

  return (
    <PowerfulTable
      columns={[
        {
          id: 'productName',
          header: 'Product Name',
        },
        {
          id: 'inStock',
          header: 'In Stock',
        },
        {
          id: 'skus',
          header: 'SKUs',
        },
        {
          id: 'price',
          header: 'Price',
        },
      ]}
      items={fruits}
    />
  )
}
