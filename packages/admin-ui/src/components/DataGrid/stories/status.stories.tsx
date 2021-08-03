import React from 'react'
import type { Meta } from '@storybook/react'

import { DataGrid } from '../index'
import { useDataGridState } from '../hooks/useDataGridState'
import { Button } from '../../Button'

export default {
  title: 'admin-ui/DataGrid/status',
  component: DataGrid,
} as Meta

interface Item {
  id: number
  productName: string
  condition: string
  price: number
}

export function Status() {
  const state = useDataGridState<Item>({
    columns: [
      {
        id: 'id',
        header: 'ID',
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
    ],
    items: [
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
  })

  return (
    <DataGrid
      state={state}
      csx={{
        width: 500,
      }}
    >
      <DataGrid.Section>
        <Button onClick={() => state.setStatus({ type: 'ready' })}>
          Ready
        </Button>
        <Button onClick={() => state.setStatus({ type: 'loading' })}>
          Loading
        </Button>
        <Button
          onClick={() =>
            state.setStatus({
              type: 'error',
              message: 'Something went wrong',
              action: {
                text: 'Try again',
                onClick: () => alert('Clicked'),
              },
            })
          }
        >
          Error
        </Button>
        <Button
          onClick={() =>
            state.setStatus({
              type: 'not-found',
              message: 'The params do not match',
              suggestion: 'Try a different text',
            })
          }
        >
          Not Found
        </Button>
        <Button
          onClick={() =>
            state.setStatus({
              type: 'empty',
              message: 'You do not have any product yet',
              action: {
                text: 'Create one',
                onClick: () => alert('Clicked'),
              },
            })
          }
        >
          Empty
        </Button>
      </DataGrid.Section>
      <DataGrid.Table />
    </DataGrid>
  )
}
