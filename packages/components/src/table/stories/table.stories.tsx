import '../../../dist/styles.min.css'
import '../table.css'
import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../index'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { IconButton } from '../../icon-button'
import { IconDotsThreeVertical } from '@vtex/shoreline-icons'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { VisuallyHidden } from '../../visually-hidden'

export default {
  title: 'shoreline-components/table',
}

export function Default() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Anita</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lucas</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Marcelo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Matheus</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

const defaultData: Product[] = [
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_600970-MLA45807765056_052021-F.webp',
    name: 'Apple Airpods Max',
    updatedAt: 'Yesterday',
    status: 'inactive',
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_914414-MLB51804338989_102022-F.webp',
    name: 'Apple Watch 8',
    updatedAt: 'Today',
    status: 'published',
  },
  {
    imageUrl:
      'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
    name: 'iPhone 15 pro',
    updatedAt: 'Today',
    status: 'published',
  },
]

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('name', {
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
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Last update',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <VisuallyHidden>Actions</VisuallyHidden>,
    cell: ({
      row: {
        original: { name },
      },
    }) => {
      return (
        <IconButton
          onClick={() => alert(`Clicked ${name}`)}
          label="Actions"
          variant="tertiary"
        >
          <IconDotsThreeVertical />
        </IconButton>
      )
    },
  }),
]

export function TanStack() {
  const [data, setData] = React.useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
