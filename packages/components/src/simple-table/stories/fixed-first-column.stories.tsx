import React, { useMemo } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'
import type { ColumnDef } from '@tanstack/react-table'

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
import { VisuallyHidden } from '../../visually-hidden'
import { SimpleTable } from '../index'

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
  title: 'shoreline-components/simple-table',
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue()
          const variant = value === 'Published' ? 'green' : 'gray'

          return (
            <Tag variant={variant} size="normal">
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
      },
    ],
    []
  )

  return <SimpleTable data={data} columns={columns} stickyColumn />
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const value = getValue()
          const variant = value === 'Published' ? 'green' : 'gray'

          return (
            <Tag variant={variant} size="normal">
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
      },
    ],
    []
  )

  return <SimpleTable data={data} columns={columns} stickyColumn stickyHeader />
}
