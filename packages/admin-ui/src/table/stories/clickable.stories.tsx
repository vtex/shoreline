import React from 'react'
import type { Meta } from '@storybook/react'

import { Table } from '../index'
import { useTableState } from '../hooks/use-table-state'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'

import { Menu, MenuButton, MenuItem, useMenuState } from '../../menu'

export default {
  title: 'admin-ui-review/table/clickable',
  component: Table,
} as Meta

interface Item {
  id: number
  productName: string
  description: string
  condition: string
  price: number
}

export function Clickable() {
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
    ],
    []
  )

  const columns = React.useMemo(
    () =>
      [
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
            isNameCell: true,
            mapText: (item) => item.productName,
            mapDescription: (item) => item.description,
          },
        },
        {
          id: 'condition',
          header: 'Condition',
        },
        {
          header: 'Actions',
          resolver: {
            type: 'root',
            render: ({ item }) => {
              const menu = useMenuState()

              const handleClick = (
                event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
              ) => event.stopPropagation()

              return (
                <>
                  <MenuButton
                    state={menu}
                    variant="neutralTertiary"
                    onClick={handleClick}
                    labelHidden
                  />
                  <Menu state={menu}>
                    <MenuItem label="Add to cart" onClick={handleClick} />
                    <MenuItem label="Buy" onClick={handleClick} />
                  </Menu>
                </>
              )
            },
          },
        },
      ] as Array<TableColumn<Item, BaseResolvers<Item>>>,
    []
  )

  const state = useTableState<Item>({
    columns,
    items,
    onRowClick: (item) => alert(`Row clicked: ${item.productName}`),
  })

  return <Table state={state} csx={{ width: 800 }} />
}
