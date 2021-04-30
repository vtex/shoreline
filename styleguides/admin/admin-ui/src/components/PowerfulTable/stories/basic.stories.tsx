import React from 'react'
import { Meta } from '@storybook/react'

import { StatefulTable } from '../'

export default {
  title: 'admin-ui/PowerfulTable/Basic',
  component: StatefulTable,
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
    <StatefulTable
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

export function OnRowClick() {
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
    <StatefulTable
      onRowClick={(item) => alert(item.productName)}
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
