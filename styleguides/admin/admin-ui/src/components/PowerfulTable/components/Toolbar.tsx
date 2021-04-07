import React, { useEffect, useState } from 'react'
import { Box } from '@vtex/admin-primitives'
import { Set } from '../../Set'
import { Toolbar, useToolbarState } from '../../Toolbar'
import { Search } from '../../Search'
import { Button } from '../../Button'
import { IconFilter, IconImport, IconExport } from '@vtex/admin-ui-icons'
import { TableToolbarProps } from '../PowerfulTable'

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
            csx={{ height: '2rem' }}
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
              variant="adaptative-dark"
              csx={{
                color: 'dark.secondary',
                ':hover': {
                  bg: 'light.secondary',
                },
                ':active': {
                  color: 'blue',
                  bg: 'light.secondary',
                },
                ':disabled': {
                  color: 'mid.primary',
                },
              }}
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
                variant="adaptative-dark"
                csx={{
                  color: 'dark.secondary',
                  ':hover': {
                    bg: 'light.secondary',
                  },
                  ':active': {
                    color: 'blue',
                    bg: 'light.secondary',
                  },
                  ':disabled': {
                    color: 'mid.primary',
                  },
                }}
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
                variant="adaptative-dark"
                csx={{
                  color: 'dark.secondary',
                  ':hover': {
                    bg: 'light.secondary',
                  },
                  ':active': {
                    color: 'blue',
                    bg: 'light.secondary',
                  },
                  ':disabled': {
                    color: 'mid.primary',
                  },
                }}
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
