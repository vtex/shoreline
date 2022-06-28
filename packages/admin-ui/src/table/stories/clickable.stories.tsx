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
  name: string
  price: number
}

export function Clickable() {
  const items = React.useMemo(
    () => [
      {
        id: 1,
        name: 'Color 1',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_gD9Fm-5bttYHoJ-wxD2W8kK2boZsQItYw&usqp=CAU',
        price: 100,
      },
      {
        id: 2,
        name: 'Color 2',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsvxLXJ3jW2hQox375iMAcaScYMpUmXk1dFw&usqp=CAU',
        price: 30,
      },
      {
        id: 3,
        name: 'Color 3',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FyiZM7bDPsDEMtg0Zs2HXNwe2xbVh55IZA&usqp=CAU',
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
          id: 'name',
          header: 'Name',
          resolver: {
            type: 'text',
            isNameCell: true,
            mapText: (item) => item.name,
          },
        },
        {
          id: 'price',
          header: 'Price',
        },
        {
          header: 'Actions',
          resolver: {
            type: 'root',
            render: () => {
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
    onRowClick: (item) => alert(`Row clicked: ${item.name}`),
  })

  return <Table state={state} csx={{ width: 800 }} />
}
