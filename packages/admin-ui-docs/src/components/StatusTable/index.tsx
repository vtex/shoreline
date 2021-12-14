import type { ReactNode } from 'react'
import React, { useEffect } from 'react'
import {
  useDataGridState,
  useDataViewState,
  useSearchState,
  useDropdownState,
  Tag,
} from '@vtex/admin-ui'
import { FilterDataGrid } from '../FilterDataGrid'

interface StatusTableProps {
  items: Array<{
    component: string
    status: string
    notes: ReactNode
    type: string
  }>
}

const filters = [
  'All',
  'Supported',
  'Experimental',
  'In Development',
  'Upcoming',
]

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
    return items.filter((item) => {
      const searchLowerCase = search.debouncedValue.toLocaleLowerCase()

      if (filter !== 'all' && filter !== item.status.toLowerCase()) return false

      return item.component.toLowerCase().includes(searchLowerCase)
    })
  }, [search])

  useEffect(() => {
    if (!searchedItems.length) {
      dataView.setStatus({
        type: 'not-found',
        message: 'The component you are looking for does not exist',
      })
    } else {
      dataView.setStatus({
        type: 'ready',
      })
    }
  }, [searchedItems.length])

  const dataGrid = useDataGridState({
    density: 'variable',
    columns: [
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
              supported: 'green',
              'in development': 'lightBlue',
              experimental: 'orange',
              upcoming: 'purple',
            }[status]

            return (
              <Tag
                label={column?.item?.status}
                palette={palette as any}
                size="small"
              />
            )
          },
        },
      },
      {
        id: 'notes',
        header: 'notes',
      },
    ],
    items: searchedItems,
  })

  return (
    <FilterDataGrid
      filters={filters}
      dataGrid={dataGrid}
      dataView={dataView}
      search={search}
      dropdown={dropdown}
    />
  )
}

export * from './components'
