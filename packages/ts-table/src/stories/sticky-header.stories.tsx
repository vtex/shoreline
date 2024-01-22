import React, { useMemo } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'
import type { ColumnDef } from '@tanstack/react-table'
import {
  Flex,
  Text,
  IconButton,
  Tag,
  Menu,
  MenuProvider,
  MenuItem,
  MenuTrigger,
  MenuSeparator,
  VisuallyHidden,
} from '@vtex/shoreline-components'

import { TsTable } from '../index'

const data = [...Array(30)].map((_, index) => ({
  id: index,
  imageUrl:
    'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
  name: 'iPhone 15 pro',
  updatedAt: 'Today',
  status: 'Published',
}))

export default {
  title: 'ts-table/ts-table',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

export function StickyHeader() {
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

  return <TsTable data={data} columns={columns} stickyHeader />
}
