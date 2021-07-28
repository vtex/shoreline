import React from 'react'
import type { Meta } from '@storybook/react'

import { DataGrid } from '../index'
import { useDataGridState } from '../hooks/useDataGridState'
import type { DataGridColumn } from '../typings'
import type { BaseResolvers } from '../resolvers/base'

export default {
  title: 'admin-ui/DataGrid/selectable',
  component: DataGrid,
} as Meta

interface Item {
  id: number
  productName: string
  condition: string
  price: number
}

export function Selectable() {
  const items = React.useMemo(
    () => [
      {
        id: 1,
        productName: 'Orange',
        condition: 'Good',
        price: 100,
      },
      {
        id: 2,
        productName: 'Lemon',
        condition: 'Average',
        price: 30,
      },
      {
        id: 3,
        productName: 'Tomato',
        condition: 'Mint',
        price: 10,
      },
    ],
    []
  )

  const columns = React.useMemo(
    () =>
      [
        {
          id: 'id',
          resolver: {
            type: 'selection',
            mapId: (item: Item) => item.id,
          },
        },
        {
          id: 'productName',
          header: 'Product Name',
        },
        {
          id: 'condition',
          header: 'Condition',
        },
        {
          id: 'price',
          header: 'Price',
        },
      ] as Array<DataGridColumn<Item, BaseResolvers<Item>>>,
    []
  )

  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return <DataGrid state={state} csx={{ width: 'full' }} />
}
