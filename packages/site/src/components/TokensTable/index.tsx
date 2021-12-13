import React, { useEffect } from 'react'
import type { StyleProp } from '@vtex/admin-ui'
import {
  useDataGridState,
  useDataViewState,
  useSearchState,
  get,
  theme,
  Text,
  Flex,
  useDropdownState,
  Center,
} from '@vtex/admin-ui'
import { FilterDataGrid } from '../FilterDataGrid'

const filters = ['All', 'Background', 'Color', 'Border', 'BoxShadow']

export function TokensTable(props: TokensTableProps) {
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

      if (filter !== 'all' && filter !== item.type.toLowerCase()) return false

      return (
        item.token.toLowerCase().includes(searchLowerCase) ||
        item.value.toLowerCase().includes(searchLowerCase)
      )
    })
  }, [search])

  useEffect(() => {
    if (!searchedItems.length) {
      dataView.setStatus({
        type: 'not-found',
        message: 'The token you are looking for does not exist',
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
        id: 'name',
        header: 'Token',
        width: 500,
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <Flex direction="column">
                <Text csx={{ fontSettings: 'medium' }}>
                  {column.item.token}
                </Text>
                <Text tone="secondary">{column.item.description}</Text>
              </Flex>
            )
          },
        },
      },
      {
        id: 'values',
        header: 'Values',
        width: 260,
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <Flex direction="column">
                <Text csx={{ fontSettings: 'medium' }}>
                  {column.item.value}
                </Text>
                <Text tone="secondary">{get(theme, column.item.token)}</Text>
              </Flex>
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
              <Center
                csx={{
                  ...column.item.csx,
                  width: 100,
                  height: 60,
                  borderRadius: 'default',
                  fontSize: 22,
                }}
              >
                AA
              </Center>
            )
          },
        },
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

interface TokensTableProps {
  items: Array<{
    token: string
    description: string
    value: string
    type: string
    csx: StyleProp
  }>
}

export * from './tokens'
