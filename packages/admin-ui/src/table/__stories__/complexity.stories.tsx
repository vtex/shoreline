import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import {
  DataGrid,
  DataGridBody,
  DataGridBodyRow,
  DataGridHead,
  DataGridCell,
  createColumns,
} from '../index'
import { useDataGridState } from '../hooks/use-table-state'
import { DataView, useDataViewState } from '../../components/DataView'

export default {
  title: 'admin-ui-review/Table/complexity',
  component: DataGrid,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const items = [...Array(10).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

const columns = createColumns<Item>([
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
])

export function Zero() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return <DataGrid state={state} csx={{ width: 560 }} />
}

export function LevelOne() {
  const view = useDataViewState()
  const grid = useDataGridState<Item>({
    columns,
    items,
    view,
  })

  return (
    <DataView state={view}>
      <DataGrid state={grid} csx={{ width: 560 }} />
    </DataView>
  )
}

export function LevelTwo() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGridHead />
      <DataGridBody />
    </DataGrid>
  )
}

export function Full() {
  const state = useDataGridState<Item>({
    columns,
    items,
  })

  return (
    <DataGrid state={state} csx={{ width: 560 }}>
      <DataGridHead>
        <DataGridCell />
      </DataGridHead>
      <DataGridBody>
        <DataGridBodyRow>
          <DataGridCell />
        </DataGridBodyRow>
      </DataGridBody>
    </DataGrid>
  )
}
