import type { ReactNode } from 'react'
import React, { useEffect } from 'react'
import {
  useTableState,
  useDataViewState,
  useSearchState,
  useDropdownState,
  Tag,
  createColumns,
} from '@vtex/admin-ui'
import { FilterTable } from '../FilterTable'

interface StatusTableProps {
  items: Item[]
}

interface Item {
  component: string
  status: string
  notes: ReactNode
  type: string
}

const filters = [
  'All',
  'Proposed',
  'Designed',
  'Experimental',
  'Stable',
  'Deprecated',
]

const columns = createColumns<Item>([
  {
    id: 'component',
    header: 'Component',
    width: 250,
  },
  {
    id: 'status',
    header: 'Status',
    width: 250,
    resolver: {
      type: 'root',
      render: (column) => {
        const { status } = column.item

        const palette = {
          proposed: 'gray',
          designed: 'purple',
          experimental: 'orange',
          stable: 'green',
          deprecated: 'red',
        }[status]

        return <Tag label={column?.item?.status} variant={palette as any} />
      },
    },
  },
  {
    id: 'notes',
    header: 'notes',
  },
])

export function StatusTable(props: StatusTableProps) {
  const dataView = useDataViewState()
  const search = useSearchState()
  const { items = [] } = props

  const dropdown = useDropdownState({
    items: filters,
    initialSelectedItem: filters[0],
  })

  const filter = React.useMemo(
    () => dropdown.selectedItem?.toLowerCase(),
    [dropdown.selectedItem]
  )

  const searchedItems = React.useMemo(() => {
    return items
      .filter((item) => {
        const searchLowerCase = search.debouncedValue.toLocaleLowerCase()

        if (filter !== 'all' && filter !== item.status.toLowerCase())
          return false

        return item.component.toLowerCase().includes(searchLowerCase)
      })
      .sort((a, b) => a.component.localeCompare(b.component))
  }, [search])

  useEffect(() => {
    if (!searchedItems.length) {
      dataView.setStatus({
        type: 'not-found',
      })
    } else {
      dataView.setStatus({
        type: 'ready',
      })
    }
  }, [searchedItems.length])

  const table = useTableState({
    columns,
    items: searchedItems,
  })

  return (
    <FilterTable
      filters={filters}
      table={table}
      dataView={dataView}
      search={search}
      dropdown={dropdown}
    />
  )
}

export * from './components'
