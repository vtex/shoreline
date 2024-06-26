import { useMemo } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline'
import type { ColumnDef } from '@tanstack/react-table'
import {
  MenuProvider,
  MenuItem,
  MenuTrigger,
  MenuSeparator,
  Flex,
  Text,
  IconButton,
  Tag,
  VisuallyHidden,
  MenuPopover,
} from '@vtex/shoreline'

import { TsTable } from '../index'

const data = [...Array(30)].map((_, index) => ({
  imageUrl:
    'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
  name: 'iPhone 15',
  updatedAt: 'Today',
  status: 'Published',
  createdAt: '2021-10-01',
  index,
  category: 'Eletronics',
  price: '$ 1.000,00',
  quantity: 10,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  seller: 'John Doe',
}))

export default {
  title: 'ts-table/ts-table',
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

export function StickyFirstColumn() {
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
            <Flex
              align="center"
              gap="var(--sl-space-2)"
              style={{ minWidth: '150px' }}
            >
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text variant="body">{name}</Text>
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
        accessorKey: 'status',
        header: 'Status',
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
        accessorKey: 'createdAt',
        header: 'Created at',
      },
      {
        accessorKey: 'index',
        header: 'Index',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'seller',
        header: 'Seller',
      },
      {
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
              <MenuPopover>
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
              </MenuPopover>
            </MenuProvider>
          )
        },
      },
    ],
    []
  )

  return <TsTable data={data} columns={columns} stickyColumn />
}

export function StickyFirstColumnWithStickyHeader() {
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
            <Flex
              align="center"
              gap="var(--sl-space-2)"
              style={{ minWidth: '110px' }}
            >
              <img
                style={{
                  width: 32,
                }}
                src={imageUrl}
                alt={`product ${name}`}
              />
              <Text variant="body">{name}</Text>
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
        accessorKey: 'status',
        header: 'Status',
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
        accessorKey: 'createdAt',
        header: 'Created at',
      },
      {
        accessorKey: 'index',
        header: 'Index',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'seller',
        header: 'Seller',
      },
      {
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
              <MenuPopover>
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
              </MenuPopover>
            </MenuProvider>
          )
        },
      },
    ],
    []
  )

  return <TsTable data={data} columns={columns} stickyColumn stickyHeader />
}
