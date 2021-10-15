import React from 'react'
import {
  useDataGridState,
  DataGrid,
  useDataViewState,
  useSearchState,
  DataView,
  DataViewControls,
  Search,
  tag,
  Paragraph,
  Set,
  get,
  theme,
  Text,
} from '@vtex/admin-ui'
import type { tokens } from './tokens'

interface TokensTableProps {
  items: Array<{ token: string; description: string; color: string }>
  type: keyof typeof tokens
}

export function TokensTable(props: TokensTableProps) {
  const view = useDataViewState()
  const search = useSearchState()
  const { items = [], type } = props

  const searchedItems = React.useMemo(() => {
    return items.filter((item) => {
      const searchLowerCase = search.debouncedValue.toLocaleLowerCase()

      return (
        item.token.toLowerCase().includes(searchLowerCase) ||
        item.description.toLowerCase().includes(searchLowerCase) ||
        item.color.toLowerCase().includes(searchLowerCase)
      )
    })
  }, [search])

  const state = useDataGridState({
    density: 'variable',
    /**
     * Columns shape, read more about it on the rendering section
     */
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
                <Paragraph csx={{ fontSettings: 'medium' }}>
                  {column.item.token}
                </Paragraph>
                <Text tone="muted">{column.item.description}</Text>
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
              <Set spacing={2} orientation="vertical" csx={{ color: 'muted' }}>
                <tag.div
                  csx={{
                    marginRight: '2',
                    width: 80,
                    height: 40,
                    bg: (theme: any) =>
                      get(theme, `colors.${column.item.color}`),
                    boxShadow:
                      type === 'shadows'
                        ? get(theme, column.item.token)
                        : 'menu',
                    borderRadius: 'default',
                  }}
                />
                <tag.div
                  csx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Paragraph>{column.item.color}</Paragraph>
                  <Paragraph>
                    {get(theme, `colors.${column.item.color}`)}
                  </Paragraph>
                </tag.div>
              </Set>
            )
          },
        },
      },
    ],
    /**
     * List of items to render
     */
    items: searchedItems,
  })

  /**
   * You must use the state prop so that your DataGrid comes to life
   * This is the only prop that is required
   */
  return (
    <DataView state={view}>
      <DataViewControls>
        <Search id="search" placeholder="Search" state={search} />
      </DataViewControls>
      <DataGrid state={state} />
    </DataView>
  )
}

export * from './tokens'
