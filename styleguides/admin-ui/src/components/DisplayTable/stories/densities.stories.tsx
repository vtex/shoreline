import React from 'react'
import { Meta, Story } from '@storybook/react'

import { DisplayTable, DisplayTableProps } from '../index'
import { baseResolvers } from '../resolvers/base'

export default {
  title: 'beta/DisplayTable/Densities',
  component: DisplayTable,
} as Meta

interface Item {
  id: number
  location: string
  date: string
  status: string
}

const Template: Story<DisplayTableProps<Item>> = (args) => (
  <DisplayTable
    {...args}
    columns={[
      {
        id: 'location',
        lead: 'Location',
        width: 148,
      },
      {
        id: 'date',
        lead: 'Date',
        width: 148,
      },
      {
        id: 'status',
        lead: 'Status',
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
  />
)

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
