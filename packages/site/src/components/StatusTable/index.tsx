import type { ReactNode } from 'react'
import React, { useEffect } from 'react'
import {
  useDataGridState,
  DataGrid,
  useDataViewState,
  useSearchState,
  DataView,
  DataViewControls,
  Search,
  useDropdownState,
  usePaginationState,
  Dropdown,
  FlexSpacer,
  Pagination,
  Tag,
} from '@vtex/admin-ui'

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
  const view = useDataViewState()
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
    pagination.paginate({ type: 'setTotal', total: searchedItems.length })
  }, [searchedItems.length])

  useEffect(() => {
    if (!searchedItems.length) {
      view.setStatus({
        type: 'not-found',
        message: 'The component you are looking for does not exist',
      })
    } else {
      view.setStatus({
        type: 'ready',
      })
    }
  }, [searchedItems.length])

  const pagination = usePaginationState({
    pageSize: 25,
    total: searchedItems.length,
  })

  const state = useDataGridState({
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
    items: searchedItems.slice(pagination.range[0] - 1, pagination.range[1]),
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <DataViewControls>
          <Search id="search" placeholder="Search" state={search} />
          <Dropdown
            label="Status"
            state={dropdown}
            items={filters}
            csx={{
              color: 'action.neutral.ghost',
              bg: 'action.neutral.ghost',
              ':hover': {
                color: 'action.neutral.ghostHover',
                bg: 'action.neutral.ghostHover',
              },
              ':active': {
                color: 'action.neutral.ghostPressed',
                bg: 'action.neutral.ghostPressed',
              },
            }}
          />
          <FlexSpacer />
          <Pagination
            state={pagination}
            preposition="of"
            subject="results"
            prevLabel="Previous"
            nextLabel="Next"
          />
        </DataViewControls>
      </DataViewControls>
      <DataGrid state={state} />
    </DataView>
  )
}

export * from './components'
