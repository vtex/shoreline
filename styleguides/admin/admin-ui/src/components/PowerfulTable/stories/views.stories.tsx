import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { StatefulTable } from '../../PowerfulTable'
import { Box } from '@vtex/admin-primitives'
import { Button } from '../../Button'
import { TableViewState } from '../../Table/context'
import { Set } from '../../Set'

export default {
  title: 'admin-ui/Table/Views',
  component: StatefulTable,
} as Meta

export function Views() {
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
            title: 'You don’t have a product yet',
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
