import React, { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import { getExpandedColumn, getSelectionColumn } from '../columns'
import { Flex } from '@vtex/shoreline-components'
import { TsTable } from '../index'

export default {
  title: 'ts-table/ts-table',
}

type Country = {
  name: string
  currency: string
}

type RegionalData = {
  continent: string
  countries: Country[]
}

export function NestingExpand() {
  const continetColumns = useMemo<Array<ColumnDef<RegionalData>>>(
    () => [
      getSelectionColumn(),
      getExpandedColumn(),
      {
        accessorKey: 'continent',
        header: 'Continent',
      },
    ],
    []
  )

  const countryColumns = useMemo<Array<ColumnDef<Country>>>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'currency',
        header: 'Currency',
      },
    ],
    []
  )

  return (
    <TsTable
      data={[
        {
          continent: 'Asia',
          countries: [{ name: 'China', currency: 'Chinese Yuan' }],
        },
        {
          continent: 'Americas',
          countries: [{ name: 'Brasil', currency: 'Brazilian Real' }],
        },
      ]}
      getRowCanExpand={(row) => !!row.original.countries}
      columns={continetColumns}
      renderDetail={(row) => (
        <Flex
          style={{
            padding: 'var(--sl-space-4) var(--sl-space-10)',
            background: 'var(--sl-bg-muted)',
            width: '100%',
          }}
        >
          <TsTable data={row.original.countries} columns={countryColumns} />
        </Flex>
      )}
      columnWidths={['0fr', '0fr', '1fr']}
    />
  )
}
