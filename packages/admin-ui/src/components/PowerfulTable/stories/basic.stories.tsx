import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { StatelessTable } from '..'
import { useTableState } from '../../Table'

export default {
  title: 'admin-ui/PowerfulTable/Basic',
  component: StatelessTable,
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

  const tableState = useTableState({
    columns: [
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
    ],
    items: fruits,
  })

  return <StatelessTable state={tableState} />
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

  const tableState = useTableState({
    onRowClick: (item) => alert(item.productName),
    columns: [
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
    ],
    items: fruits,
  })

  return <StatelessTable state={tableState} />
}

export function LoadingAndRowClick() {
  const [loading, setLoading] = useState(false)

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

  const tableState = useTableState({
    onRowClick: (item) => alert(item.productName),
    columns: [
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
    ],
    items: fruits,
    loading,
  })

  return (
    <StatelessTable state={tableState}>
      <StatelessTable.Section>
        <StatelessTable.Toolbar>
          <StatelessTable.Toolbar.Button onClick={() => setLoading(!loading)}>
            loading
          </StatelessTable.Toolbar.Button>
        </StatelessTable.Toolbar>
      </StatelessTable.Section>
    </StatelessTable>
  )
}
