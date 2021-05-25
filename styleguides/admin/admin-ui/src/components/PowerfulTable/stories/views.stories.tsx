import React, { useState, useMemo } from 'react'
import { Meta } from '@storybook/react'

import { StatefulTable } from '../../PowerfulTable'
import { Box } from '@vtex/admin-primitives'
import { TableViewState } from '../../Table/context'
import { Input } from '../../Input'

export default {
  title: 'admin-ui/PowerfulTable/Views',
  component: StatefulTable,
} as Meta

export function Views() {
  const [tableState, setTableState] = useState<keyof TableViewState>()

  return (
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
    >
      <StatefulTable.Section>
        <StatefulTable.Toolbar>
          <StatefulTable.Toolbar.Button onClick={() => setTableState('empty')}>
            empty
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button
            onClick={() => setTableState('itemsNotFound')}
          >
            items not found
          </StatefulTable.Toolbar.Button>
          <StatefulTable.Toolbar.Button onClick={() => setTableState('empty')}>
            empty
          </StatefulTable.Toolbar.Button>
        </StatefulTable.Toolbar>
      </StatefulTable.Section>
    </StatefulTable>
  )
}

export function CustomizeView() {
  const [title, setTitle] = useState('View Title')
  const [text, setText] = useState('View Text')
  const [tableState, setTableState] = useState<keyof TableViewState>('empty')
  const [anchor, setAnchor] = useState<'anchor' | 'text'>('anchor')

  const viewObj = useMemo(() => {
    if (anchor === 'anchor') {
      return {
        title,
        anchor: { text },
      }
    }

    return { title, text }
  }, [anchor, text])

  return (
    <Box>
      <StatefulTable
        density="compact"
        columns={[]}
        items={[]}
        empty={tableState === 'empty'}
        error={tableState === 'error'}
        itemsNotFound={tableState === 'itemsNotFound'}
        views={{
          empty: viewObj,
          error: viewObj,
          itemsNotFound: viewObj,
        }}
      >
        <StatefulTable.Section>
          <Input
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="text"
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <StatefulTable.Toolbar>
            <StatefulTable.Toolbar.Button
              onClick={() => setTableState('empty')}
            >
              empty
            </StatefulTable.Toolbar.Button>
            <StatefulTable.Toolbar.Button
              onClick={() => setTableState('itemsNotFound')}
            >
              items not found
            </StatefulTable.Toolbar.Button>
            <StatefulTable.Toolbar.Button
              onClick={() => setTableState('empty')}
            >
              empty
            </StatefulTable.Toolbar.Button>
            <StatefulTable.Toolbar.Button
              onClick={() => setAnchor(anchor === 'anchor' ? 'text' : 'anchor')}
            >
              {anchor === 'anchor' ? 'text' : 'anchor'}
            </StatefulTable.Toolbar.Button>
          </StatefulTable.Toolbar>
        </StatefulTable.Section>
      </StatefulTable>
    </Box>
  )
}
