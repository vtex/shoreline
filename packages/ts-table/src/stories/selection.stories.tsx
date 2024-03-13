import React, { useMemo } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'
import type { ColumnDef } from '@tanstack/react-table'

import {
  Menu,
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
} from '@vtex/shoreline-components'

import { TsTable, getSelectionColumn } from '../index'

export default {
  title: 'ts-table/ts-table',
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

export function Selection() {
  const columns = useMemo<Array<ColumnDef<Product>>>(
    () => [
      getSelectionColumn(),
      {
        id: 'name',
        cell: ({
          row: {
            original: { name, imageUrl },
          },
        }) => {
          return (
            <Flex align="center" gap="var(--sl-space-2)">
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

  return (
    <TsTable
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
