import '../../../dist/styles.min.css'
import '../simple-table.css'
import React, { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { SimpleTable } from '../index'
import { faker } from '@faker-js/faker'

export default {
  title: 'shoreline-components/simple-table',
}

interface Service {
  name: string
  department: string
  price: string
}

export const data: Service[] = Array(50000)
  .fill(1)
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.company.name(),
      price: faker.commerce.price(),
      department: faker.commerce.department(),
    }
  })

export function VirtualizedRows() {
  const columns = useMemo<Array<ColumnDef<Service>>>(
    () => [
      {
        accessorKey: 'name',
        header: 'Service name',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
    ],
    []
  )

  return (
    <>
      <SimpleTable
        data={data}
        columns={columns}
        rowClick={{
          type: 'action',
          onClick: (row) => {
            alert(`You clicked: ${row.original.name}`)
          },
        }}
        virtualize
      />
      <div style={{ marginTop: '16px' }}>Number of rows: {data.length}</div>
    </>
  )
}
