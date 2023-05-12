import React from 'react'
import type { Meta } from '@storybook/react'

import {
  useTableState,
  Table,
  TBody,
  TBodyRow,
  THead,
  THeadCell,
  TBodyCell,
} from '../index'
import type { TableColumn } from '../types'
import type { BaseResolvers } from '../resolvers/base'
import { csx } from '@vtex/admin-ui-core'
import { SelectionTree, useSelectionTreeState } from '../../selection-tree'

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

  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    columns,
    items,
  })

  const selection = useSelectionTreeState({
    items: state.data,
    mapId: (item) => item.id,
  })

  return (
    <SelectionTree state={selection}>
      <Table {...getTable()} className={csx({ width: 800 })}>
        <THead>
          {columns.map((column) => {
            return <THeadCell {...getHeadCell(column)} />
          })}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow key={item.id}>
                {columns.map((column) => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>
      </Table>
    </SelectionTree>
  )
}
