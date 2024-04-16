import React from 'react'
import { TsTable } from '@vtex/shoreline-ts-table'
import { Tag } from '@vtex/shoreline'

const data: Product[] = [
  {
    name: 'iPhone 15',
    description: 'A nice phone',
    brand: 'Apple',
    category: 'smartphones',
  },
]

interface Product {
  name: string
  description: string
  brand: string
  category: string
}

export default function Example() {
  return (
    <TsTable
      data={data}
      columns={[
        { accessorKey: 'name' },
        { accessorKey: 'description' },
        {
          accessorKey: 'brand',
          cell: (cell) => <Tag>{cell.renderValue()}</Tag>,
        },
        { accessorKey: 'category' },
      ]}
    />
  )
}
