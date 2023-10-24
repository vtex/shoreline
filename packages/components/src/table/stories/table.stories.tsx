import '../../../dist/styles.min.css'
import '../table.css'
import React from 'react'

import '../../menu/menu.css'

import {
  SimpleTable,
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
import { Tag } from '../../tag'
import {
  Menu,
  MenuProvider,
  MenuItem,
  MenuTrigger,
  MenuSeparator,
} from '../../menu'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'

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
    cell: ({ getValue }) => {
      const value = getValue()
      const variant = value === 'Published' ? 'green' : 'gray'

      return (
        <Tag variant={variant} size="normal">
          {value}
        </Tag>
      )
    },
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
        <MenuProvider>
          <MenuTrigger asChild>
            <IconButton label="Actions" variant="tertiary">
              <IconDotsThreeVertical />
            </IconButton>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconCloudArrowUp /> Publish
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical onClick={() => alert(`Deleted ${name}`)}>
              <IconTrash /> Delete
            </MenuItem>
          </Menu>
        </MenuProvider>
      )
    },
  }),
]

export function TanStack() {
  return (
    <SimpleTable
      data={[
        {
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_2X_600970-MLA45807765056_052021-F.webp',
          name: 'Apple Airpods Max',
          updatedAt: 'Yesterday',
          status: 'Inactive',
        },
        {
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_2X_914414-MLB51804338989_102022-F.webp',
          name: 'Apple Watch 8',
          updatedAt: 'Today',
          status: 'Published',
        },
        {
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
          name: 'iPhone 15 pro',
          updatedAt: 'Today',
          status: 'Published',
        },
      ]}
      columns={columns}
    />
  )
}
