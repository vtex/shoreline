import React, { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { SimpleTable } from '../index'

export default {
  title: 'ts-table/table',
}

interface Service {
  name: string
  url: string
  price: string
}

const services: Service[] = [
  { name: 'Vercel', url: 'https://vercel.com', price: '20 USD / Dev / Year' },
  { name: 'Netlify', url: 'https://netlify.com', price: '19 USD / Dev / Year' },
  { name: 'Azion', url: 'https://www.azion.com', price: '300 USD / Year' },
]

export function ClickableRows() {
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
    <SimpleTable
      data={services}
      columns={columns}
      rowClick={{
        type: 'action',
        onClick: (row) => {
          alert(`You clicked: ${row.original.name}`)
        },
      }}
    />
  )
}
