import React from 'react'
import type { Meta } from '@storybook/react'
import { Box } from '@vtex/admin-primitives'

import { StatelessTable } from '../../PowerfulTable'
import { baseResolvers } from '../resolvers/base'
import { Button } from '../../Button'
import { useTableState } from '../useTableState'
import type { Resolver } from '../resolvers/core'

export default {
  title: 'admin-ui/Table/States',
  component: StatelessTable,
} as Meta

interface Item {
  id: number
  location: string
  date: string
  status: string
}

interface TableProps<T> {
  loading: boolean
  resolvers: Record<string, Resolver<T>>
}

const Template = (args: TableProps<Item>) => {
  const { loading, resolvers } = args

  const tableState = useTableState(
    {
      columns: [
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
      ],
      loading,
      items: [],
    },
    resolvers
  )

  return <StatelessTable state={tableState} />
}

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

  const tableState = useTableState({
    density: 'compact',
    columns: [
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
    ],
    loading,
    items: data,
    length: 4,
  })

  return (
    <Box>
      <Button onClick={() => fetchData()} disabled={loading}>
        fetch items
      </Button>
      <StatelessTable state={tableState} />
    </Box>
  )
}
