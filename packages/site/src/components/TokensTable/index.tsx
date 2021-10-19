import React, { useEffect } from 'react'
import {
  useDataGridState,
  DataGrid,
  useDataViewState,
  useSearchState,
  DataView,
  DataViewControls,
  Search,
  tag,
  get,
  theme,
  Text,
  Dropdown,
  useDropdownState,
  usePaginationState,
  FlexSpacer,
  Pagination,
} from '@vtex/admin-ui'

const filters = ['All', 'Background', 'Foreground', 'BorderColor', 'Shadows']

export function TokensTable(props: TokensTableProps) {
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

      if (filter !== 'all' && filter !== item.type.toLowerCase()) return false

      return (
        item.token.toLowerCase().includes(searchLowerCase) ||
        item.color.toLowerCase().includes(searchLowerCase)
      )
    })
  }, [search])

  useEffect(() => {
    pagination.paginate({ type: 'setTotal', total: searchedItems.length })
  }, [searchedItems.length])

  useEffect(() => {
    if (!searchedItems.length) {
      view.setStatus({
        type: 'not-found',
        message: 'The token that you are looking for does not exist',
      })
    } else {
      view.setStatus({
        type: 'ready',
      })
    }
  }, [searchedItems.length])

  const pagination = usePaginationState({
    pageSize: 50,
    total: searchedItems.length,
  })

  const state = useDataGridState({
    density: 'variable',
    columns: [
      {
        id: 'name',
        header: 'Token',
        width: 500,
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <tag.div csx={{ display: 'flex', flexDirection: 'column' }}>
                <Text csx={{ fontSettings: 'medium' }}>
                  {column.item.token}
                </Text>
                <Text tone="muted">{column.item.description}</Text>
              </tag.div>
            )
          },
        },
      },
      {
        id: 'values',
        header: 'Values',
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <tag.div csx={{ display: 'flex', flexDirection: 'column' }}>
                <Text csx={{ fontSettings: 'medium' }}>
                  {column.item.color}
                </Text>
                <Text tone="muted">
                  {get(theme, `colors.${column.item.color}`)}
                </Text>
              </tag.div>
            )
          },
        },
      },
      {
        id: 'example',
        header: 'Example',
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <tag.div
                csx={{
                  width: 90,
                  height: 60,
                  bg: (theme) => get(theme, `colors.${column.item.color}`),
                  boxShadow:
                    column.item.type === 'shadows'
                      ? get(theme, column.item.token)
                      : 'block',
                  borderRadius: 'default',
                }}
              />
            )
          },
        },
      },
    ],
    items: searchedItems.slice(pagination.range[0] - 1, pagination.range[1]),
  })

  return (
    <DataView state={view}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
        <Dropdown
          label="Tokens Type"
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
      <DataGrid state={state} />
    </DataView>
  )
}

interface TokensTableProps {
  items: Array<{
    token: string
    description: string
    color: string
    type: string
  }>
}

export * from './tokens'
