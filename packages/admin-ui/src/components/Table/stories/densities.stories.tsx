import React from 'react'
import type { Meta } from '@storybook/react'

import { StatelessTable } from '../../PowerfulTable/index'
import { baseResolvers } from '../resolvers/base'
import { useTableState } from '../useTableState'
import type { TableDensity } from '../typings'
import type { Resolver } from '../resolvers/core'

export default {
  title: 'admin-ui/Table/Densities',
  component: StatelessTable,
} as Meta

interface Item {
  id: number
  location: string
  date: string
  status: string
}

interface TemplateProps<T> {
  density: TableDensity
  resolvers: Record<string, Resolver<T>>
}

function Template({ density, resolvers }: TemplateProps<Item>) {
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
      items: [
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
      ],
      density,
    },
    resolvers
  )

  return <StatelessTable state={tableState} />
}

export const Regular = Template.bind({})
Regular.args = {
  density: 'regular',
  resolvers: baseResolvers(),
}

export const Compact = Template.bind({})
Compact.args = {
  density: 'compact',
  resolvers: baseResolvers(),
}

export const Variable = Template.bind({})
Variable.args = {
  density: 'variable',
  resolvers: baseResolvers(),
}
