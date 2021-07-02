import React, { useState, useMemo } from 'react'
import { Meta } from '@storybook/react'

import { StatelessTable } from '../../PowerfulTable'
import { Box } from '@vtex/admin-primitives'
import { TableViewState } from '../../Table/context'
import { Input } from '../../Input'
import { useTableState } from '../../Table'

export default {
  title: 'admin-ui/PowerfulTable/Views',
  component: StatelessTable,
} as Meta

export function Views() {
  const [tableViewState, setTableViewState] = useState<keyof TableViewState>()
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
    length: 4,
    loading: tableViewState === 'loading',
    empty: tableViewState === 'empty',
    error: tableViewState === 'error',
    itemsNotFound: tableViewState === 'itemsNotFound',
  })

  return (
    <StatelessTable
      state={tableState}
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
      <StatelessTable.Section>
        <StatelessTable.Toolbar>
          <StatelessTable.Toolbar.Button
            onClick={() => setTableViewState('empty')}
          >
            empty
          </StatelessTable.Toolbar.Button>
          <StatelessTable.Toolbar.Button
            onClick={() => setTableViewState('itemsNotFound')}
          >
            items not found
          </StatelessTable.Toolbar.Button>
          <StatelessTable.Toolbar.Button
            onClick={() => setTableViewState('empty')}
          >
            empty
          </StatelessTable.Toolbar.Button>
        </StatelessTable.Toolbar>
      </StatelessTable.Section>
    </StatelessTable>
  )
}

export function CustomizeView() {
  const [title, setTitle] = useState('View Title')
  const [text, setText] = useState('View Text')
  const [tableViewState, setTableViewState] = useState<keyof TableViewState>(
    'empty'
  )
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

  const tableState = useTableState({
    density: 'compact',
    columns: [],
    items: [],
    empty: tableViewState === 'empty',
    error: tableViewState === 'error',
    itemsNotFound: tableViewState === 'itemsNotFound',
  })

  return (
    <Box>
      <StatelessTable
        state={tableState}
        views={{
          empty: viewObj,
          error: viewObj,
          itemsNotFound: viewObj,
        }}
      >
        <StatelessTable.Section>
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

          <StatelessTable.Toolbar>
            <StatelessTable.Toolbar.Button
              onClick={() => setTableViewState('empty')}
            >
              empty
            </StatelessTable.Toolbar.Button>
            <StatelessTable.Toolbar.Button
              onClick={() => setTableViewState('itemsNotFound')}
            >
              items not found
            </StatelessTable.Toolbar.Button>
            <StatelessTable.Toolbar.Button
              onClick={() => setTableViewState('empty')}
            >
              empty
            </StatelessTable.Toolbar.Button>
            <StatelessTable.Toolbar.Button
              onClick={() => setAnchor(anchor === 'anchor' ? 'text' : 'anchor')}
            >
              {anchor === 'anchor' ? 'text' : 'anchor'}
            </StatelessTable.Toolbar.Button>
          </StatelessTable.Toolbar>
        </StatelessTable.Section>
      </StatelessTable>
    </Box>
  )
}
