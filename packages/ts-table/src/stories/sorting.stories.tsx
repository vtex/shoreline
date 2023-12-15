import React, { useMemo, useState } from 'react'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Tag, Flex, Text } from '@vtex/shoreline-components'

import { TsTable } from '../index'

export default {
  title: 'ts-table/ts-table',
}

const products = [
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_600970-MLA45807765056_052021-F.webp',
    name: 'Apple Airpods Max',
    updatedAt: 'Yesterday',
    status: 'Inactive',
    inventory: 500,
    price: 3000,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_600970-MLA45807765056_052021-F.webp',
    name: 'Apple Airpods Max pro',
    updatedAt: 'Yesterday',
    status: 'Inactive',
    inventory: 200,
    price: 3500,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_600970-MLA45807765056_052021-F.webp',
    name: 'Knockoff Airpods',
    updatedAt: 'Yesterday',
    status: 'Published',
    inventory: 20,
    price: 1000,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_914414-MLB51804338989_102022-F.webp',
    name: 'Apple Watch 7',
    updatedAt: 'Today',
    status: 'Published',
    inventory: 415,
    price: 2999,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_914414-MLB51804338989_102022-F.webp',
    name: 'Apple Watch 8',
    updatedAt: 'Today',
    status: 'Published',
    inventory: 5,
    price: 3999,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_914414-MLB51804338989_102022-F.webp',
    name: 'Apple Watch 8 - 40mm',
    updatedAt: 'Yesterday',
    status: 'Inactive',
    inventory: 0,
    price: 3999,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
    name: 'iPhone 15 pro',
    updatedAt: 'Today',
    status: 'Published',
    inventory: 1014,
    price: 14000,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
    name: 'iPhone SE 2nd gen',
    updatedAt: 'Today',
    status: 'Published',
    inventory: 3050,
    price: 11000,
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
    name: 'iPhone 15',
    updatedAt: 'Today',
    status: 'Inactive',
    inventory: 503,
    price: 13000,
  },
]

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

export function Sorting() {
  const columns = useMemo<Array<ColumnDef<Product>>>(
    () => [
      {
        id: 'name',
        cell: ({
          row: {
            original: { name, imageUrl },
          },
        }) => {
          return (
            <Flex align="center" columnGap="var(--sl-space-2)">
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text>{name}</Text>
            </Flex>
          )
        },
        header: 'Product',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Last update',
      },
      {
        accessorKey: 'price',
        header: 'Price',
        sortingFn: 'basic',

        cell: ({ getValue }) => {
          const value = getValue()

          return <>{value}$</>
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue()
          const variant = value === 'Published' ? 'green' : 'gray'

          return (
            <Tag color={variant} size="normal">
              {value as any}
            </Tag>
          )
        },
      },
      {
        accessorKey: 'inventory',
        header: 'In stock',
        sortingFn: 'basic',
      },
    ],
    []
  )

  return <TsTable data={products} columns={columns} sortable />
}

const fakeAPI = (sorting: SortingState, size: number) => {
  if (!sorting || sorting.length === 0) {
    return products.slice(0, size)
  }

  const param = sorting[0].id
  const multiplier = sorting[0].desc ? -1 : 1

  return products
    .slice()
    .sort((a, b) => (a[param] - b[param]) * multiplier)
    .slice(0, size)
}

export function SortingControlled() {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<Array<ColumnDef<Product>>>(
    () => [
      {
        id: 'name',
        cell: ({
          row: {
            original: { name, imageUrl },
          },
        }) => {
          return (
            <Flex align="center" columnGap="var(--sl-space-2)">
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text>{name}</Text>
            </Flex>
          )
        },
        header: 'Product',
      },
      {
        accessorKey: 'price',
        header: 'Price',
        sortingFn: 'alphanumeric',
        cell: ({ getValue }) => {
          const value = getValue()

          return <>{value}$</>
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue()
          const variant = value === 'Published' ? 'green' : 'gray'

          return (
            <Tag color={variant} size="normal">
              {value as any}
            </Tag>
          )
        },
      },
      {
        accessorKey: 'inventory',
        header: 'In stock',
        sortingFn: 'basic',
      },
    ],
    []
  )

  return (
    <>
      <div>Sort state: {JSON.stringify(sorting)}</div>

      <TsTable
        data={fakeAPI(sorting, 5)}
        columns={columns}
        sortable
        setSort={setSorting}
        sort={sorting}
      />
    </>
  )
}
