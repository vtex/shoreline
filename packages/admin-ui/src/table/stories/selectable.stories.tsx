import React from 'react'
import type { Meta } from '@storybook/react'

import { Table } from '../index'
import { useTableState } from '../hooks/use-table-state'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'
import {
  SelectionTree,
  useSelectionTreeState,
} from '../../components/SelectionTree'

export default {
  title: 'admin-ui-review/table/selectable',
  component: Table,
} as Meta

interface Item {
  id: number
  productName: string
  description: string
  condition: string
  price: number
}

export function Selectable() {
  const items = React.useMemo(
    () => [
      {
        id: 1,
        productName: 'Orange',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',

        condition: 'Good',
        price: 100,
      },
      {
        id: 2,
        productName: 'Lemon',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Average',
        price: 30,
      },
      {
        id: 3,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 5,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 6,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 7,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 8,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 9,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 10,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 11,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 12,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 13,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 22,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 21,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 20,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 19,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 18,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 17,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 16,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 15,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        condition: 'Mint',
        price: 10,
      },
      {
        id: 14,
        productName: 'Tomato',
        description: 'Fruit',
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
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
            mapId: (item) => item.id,
          },
        },
        {
          id: 'image',
          header: 'Image',
          resolver: {
            type: 'image',
            preview: {
              display: true,
              size: 'regular',
              delay: 0,
            },
          },
        },
        {
          id: 'productName',
          header: 'Name',
          resolver: {
            type: 'text',
            columnType: 'name',
            mapText: (item) => item.productName,
            mapDescription: (item) => item.description,
          },
        },
        {
          id: 'condition',
          header: 'Condition',
        },
        {
          id: 'price',
          header: 'Price',
        },
      ] as Array<TableColumn<Item, BaseResolvers<Item>>>,
    []
  )

  const state = useTableState<Item>({
    columns,
    items,
  })

  const selection = useSelectionTreeState({
    items: state.data,
    mapId: (item) => item.id,
  })

  return (
    <SelectionTree state={selection}>
      <Table state={state} csx={{ width: 800 }} />
    </SelectionTree>
  )
}
