import '../../../dist/styles.min.css'
import '../simple-table.css'
import React, { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'

import { SimpleTable } from '../index'
import type { Country } from './countries'
import { countries } from './countries'

export default {
  title: 'shoreline-components/simple-table',
}

export function Pining() {
  const columns = useMemo<Array<ColumnDef<Country>>>(
    () => [
      {
        accessorKey: 'country',
        header: ({ header }) => {
          return (
            <>
              Country
              <button onClick={() => header.column.pin('left')}>pin</button>
            </>
          )
        },
      },
      {
        accessorKey: 'capital_city',
        header: 'Capital city',
      },
      {
        accessorKey: 'currency',
        header: 'Currency',
      },
      {
        accessorKey: 'population',
        header: ({ header }) => {
          return (
            <>
              Population
              <button onClick={() => header.column.pin('left')}>pin</button>
            </>
          )
        },
      },
    ],
    []
  )

  const data = useMemo(() => [...countries.slice(0, 30)], [])

  return (
    <div
      style={{
        width: 500,
        overflow: 'scroll',
      }}
    >
      <SimpleTable data={data} columns={columns} />
    </div>
  )
}
