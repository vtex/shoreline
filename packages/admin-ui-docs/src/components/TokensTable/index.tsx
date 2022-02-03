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

type Item = {
  token: string
  formattedToken: string
}

const filters = ['All', 'Background', 'Color', 'Border', 'BoxShadow', 'Text']

const includesSearchedText = (columnText: string, searchedText: string) =>
  columnText.toLowerCase().includes(searchedText)

const includesSearchedTokens = (columnText: string, searchedTokes: string[]) =>
  searchedTokes.reduce(
    (acc, current) => acc && columnText.toLowerCase().includes(current),
    true
  )

const includesSearchedTextInTokenColumn = (item: Item, searchedText: string) =>
  includesSearchedText(item.token, searchedText) ||
  includesSearchedText(
    item.formattedToken,
    searchedText.replace(/\s|\//g, '.')
  ) ||
  includesSearchedTokens(item.formattedToken, searchedText.split(/\s|\//g))

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

      const isSearchedTextInValueColumn =
        typeof item.value === 'string'
          ? includesSearchedText(item.value, searchLowerCase)
          : includesSearchedText(item.value.stringfied, searchLowerCase)

      return (
        includesSearchedTextInTokenColumn(item, searchLowerCase) ||
        includesSearchedText(item.type, searchLowerCase) ||
        isSearchedTextInValueColumn
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
        width: 350,
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <Flex direction="column">
                <Text
                  csx={{
                    fontSettings: 'bold',
                  }}
                >
                  {column.item.token}
                </Text>
                <Text tone="secondary">{column.item.description}</Text>
              </Flex>
            )
          },
        },
      },
      {
        id: 'type',
        header: 'Style prop',
        width: 150,
        resolver: {
          type: 'root',
          render: (column) => {
            return (
              <Flex direction="column">
                <Text>{column.item.type}</Text>
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
                  {typeof column.item.value === 'string'
                    ? column.item.value
                    : column.item.value.formatted}
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
                  width: 100,
                  height: 60,
                  borderRadius: 'default',
                  fontSize: 22,
                  ...column.item.csx,
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

type TextValueProp = {
  stringfied: string
  formatted: Node
}

interface TokensTableProps {
  items: Array<{
    token: string
    formattedToken: string
    description: string
    value: string | TextValueProp
    type: string
    csx: StyleProp
  }>
}

export * from './tokens'
