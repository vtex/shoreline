import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { StatefulTable, StatefulTableProps } from '../index'
import { baseResolvers } from '../resolvers/base'
import { Box, Flex } from '@vtex/admin-primitives'
import { Button } from '../../Button'
import { TableViewState } from '../context'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { Anchor } from '../../Anchor'

export default {
  title: 'admin-ui/Table/States',
  component: StatefulTable,
} as Meta

interface Item {
  id: number
  location: string
  date: string
  status: string
}

const Template: Story<StatefulTableProps<Item>> = (args) => (
  <StatefulTable
    {...args}
    columns={[
      {
        id: 'location',
        header: 'Location',
        width: 148,
      },
      {
        id: 'date',
        header: 'Date',
        width: 148,
      },
      {
        id: 'status',
        header: 'Status',
        width: 156,
      },
    ]}
    items={[]}
  />
)

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  resolvers: baseResolvers(),
}

export function DataFetch() {
  const [data, setData] = React.useState<Item[]>([])
  const [loading, setLoading] = React.useState(false)
  /**
   * Simulates a data fetching
   */
  const fetchData = async () => {
    setData([])
    setLoading(true)

    const simulateRequest = (delay: number, value: Item[]): Promise<Item[]> =>
      new Promise((resolve) => setTimeout(resolve, delay, value))

    const resolved = await simulateRequest(1000, [
      {
        id: 1,
        location: 'São Paulo, SP',
        date: '8/7/2020, 23:29',
        status: `Delivered`,
      },
      {
        id: 2,
        location: 'São Paulo, SP',
        date: '6/7/2020, 21:12',
        status: `Arrived at São Paulo`,
      },
      {
        id: 3,
        location: 'São Paulo, SP',
        date: '5/7/2020, 13:04',
        status: `On its way from Rio de Janeiro to São Paulo`,
      },
      {
        id: 4,
        location: 'Itaquaquecetuba, SP',
        date: '4/7/2020, 14:48',
        status: `Object dispatched at the post office`,
      },
    ])

    setData(resolved)
    setLoading(false)
  }

  return (
    <Box>
      <Button onClick={() => fetchData()} disabled={loading}>
        fetch items
      </Button>
      <StatefulTable
        density="compact"
        columns={[
          {
            id: 'location',
            header: 'Location',
            width: 148,
          },
          {
            id: 'date',
            header: 'Date',
            width: 148,
          },
          {
            id: 'status',
            header: 'Status',
            width: 156,
          },
        ]}
        loading={loading}
        items={data}
        length={4}
      />
    </Box>
  )
}

export function Empty() {
  const [tableState, setTableState] = useState<keyof TableViewState>()

  return (
    <Box>
      <Set>
        <Button onClick={() => setTableState('empty')}>empty</Button>
        <Button onClick={() => setTableState('itemsNotFound')}>
          items not found
        </Button>
        <Button onClick={() => setTableState('error')}>error</Button>
      </Set>
      <StatefulTable
        density="compact"
        columns={[
          {
            id: 'location',
            header: 'Location',
            width: 148,
          },
          {
            id: 'date',
            header: 'Date',
            width: 148,
          },
          {
            id: 'status',
            header: 'Status',
            width: 156,
          },
        ]}
        items={[
          {
            id: 1,
            location: 'São Paulo, SP',
            date: '8/7/2020, 23:29',
            status: `Delivered`,
          },
          {
            id: 2,
            location: 'São Paulo, SP',
            date: '6/7/2020, 21:12',
            status: `Arrived at São Paulo`,
          },
          {
            id: 3,
            location: 'São Paulo, SP',
            date: '5/7/2020, 13:04',
            status: `On its way from Rio de Janeiro to São Paulo`,
          },
          {
            id: 4,
            location: 'Itaquaquecetuba, SP',
            date: '4/7/2020, 14:48',
            status: `Object dispatched at the post office`,
          },
        ]}
        length={4}
        loading={tableState === 'loading'}
        empty={tableState === 'empty'}
        error={tableState === 'error'}
        itemsNotFound={tableState === 'itemsNotFound'}
        views={{
          itemsNotFound: {
            title: 'No product match your search criteria',
            text: 'Please, search for a different term',
          },
          empty: {
            title: 'You don’t have any product yet',
            anchor: {
              text: 'Create your first product',
            },
          },
          error: {
            title: 'Try again',
            anchor: {
              text: 'Something went wrong',
            },
          },
        }}
      />
    </Box>
  )
}
