import React, { MouseEventHandler, useEffect, useState } from 'react'
import { StatefulTable, StatefulTableProps } from './Stateful'
import { Box } from '@vtex/admin-primitives'
import { Set } from '../Set'
import { Toolbar, useToolbarState } from '../Toolbar'
import { Search } from '../Search'
import { Button } from '../Button'
import { IconFilter, IconImport, IconExport } from '@vtex/admin-ui-icons'

export function TableToolbar<T>(props: TableToolbarProps<T>) {
  const {
    onSearch,
    searchDisabled,
    searchLoading,
    onExport,
    onImport,
    exportDisabled,
    importDisabled,
    filterDisabled,
    searchPlaceholder = 'Search',
    filterLabel = 'Filter',
    exportLabel = 'Export',
    importLabel = 'Import',
  } = props

  const toolbarState = useToolbarState({})
  const [search, setSearch] = useState('')

  useEffect(() => onSearch?.(search), [search, onSearch])

  return (
    <Set spacing={3} csx={{ paddingY: '4' }}>
      {Boolean(onSearch) && (
        <Box
          csx={{
            svg: { margin: '0.375rem 0 0.376rem 0.5rem', top: 0 },
            input: { padding: '0.4375rem 0.25rem 0.4375rem 2rem', margin: 0 },
          }}
        >
          <Search
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            csx={{ height: '32px' }}
            loading={searchLoading}
            disabled={searchDisabled}
          />
        </Box>
      )}
      <Toolbar state={toolbarState} csx={{ padding: 0 }}>
        <Toolbar.Item>
          {(itemProps) => (
            <Button
              icon={<IconFilter />}
              variant="table-variant"
              size="small"
              disabled={filterDisabled}
              {...itemProps}
            >
              {filterLabel}
            </Button>
          )}
        </Toolbar.Item>
        {Boolean(onImport) && (
          <Toolbar.Item>
            {(itemProps) => (
              <Button
                icon={<IconImport />}
                variant="table-variant"
                size="small"
                onClick={onImport}
                disabled={importDisabled}
                {...itemProps}
              >
                {importLabel}
              </Button>
            )}
          </Toolbar.Item>
        )}
        {Boolean(onExport) && (
          <Toolbar.Item>
            {(itemProps) => (
              <Button
                icon={<IconExport />}
                variant="table-variant"
                size="small"
                onClick={onExport}
                disabled={exportDisabled}
                {...itemProps}
              >
                {exportLabel}
              </Button>
            )}
          </Toolbar.Item>
        )}
      </Toolbar>
    </Set>
  )
}

export function PowerfulTable<T>(props: PowerfulTableProps<T>) {
  const {
    onSearch,
    searchDisabled,
    searchLoading,
    onExport,
    onImport,
    exportDisabled,
    importDisabled,
    filterDisabled,
    searchPlaceholder,
    filterLabel,
    exportLabel,
    importLabel,
    ...statefulTableProps
  } = props

  return (
    <Box>
      <TableToolbar
        onSearch={onSearch}
        onExport={onExport}
        onImport={onImport}
        searchDisabled={searchDisabled}
        searchLoading={searchLoading}
        exportDisabled={exportDisabled}
        importDisabled={importDisabled}
        filterDisabled={filterDisabled}
        searchPlaceholder={searchPlaceholder}
        filterLabel={filterLabel}
        exportLabel={exportLabel}
        importLabel={importLabel}
      />
      <StatefulTable {...statefulTableProps}>oi</StatefulTable>
    </Box>
  )
}

export interface PowerfulTableProps<T> extends StatefulTableProps<T> {
  /**
   * Function called when search state changes
   */
  onSearch?: (onSearchValue: string) => void
  /**
   * Search input loading state
   */
  searchLoading?: boolean
  /**
   * Search input disabled state
   */
  searchDisabled?: boolean
  /**
   * Funtion called when export button is clicked
   */
  onExport?: MouseEventHandler<any> | undefined
  /**
   * Funtion called when import button is clicked
   */
  onImport?: MouseEventHandler<any> | undefined
  /**
   * Export disabled sate
   */
  exportDisabled?: boolean
  /**
   * Import disabled sate
   */
  importDisabled?: boolean
  /**
   * Filter disabled state
   */
  filterDisabled?: boolean
  /**
   * Search input placeholder
   * @default "Search"
   */
  searchPlaceholder?: string
  /**
   * Import button label
   * @default "Import"
   */
  importLabel?: string
  /**
   * Export button label
   * @default "Export"
   */
  exportLabel?: string
  /**
   * Filter button label
   * @default "Label"
   */
  filterLabel?: string
}

type TableToolbarProps<T> = Pick<
  PowerfulTableProps<T>,
  | 'onSearch'
  | 'searchLoading'
  | 'searchDisabled'
  | 'onImport'
  | 'onExport'
  | 'exportDisabled'
  | 'importDisabled'
  | 'filterDisabled'
  | 'searchPlaceholder'
  | 'filterLabel'
  | 'importLabel'
  | 'exportLabel'
>
