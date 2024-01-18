import React, { useMemo, useState } from 'react'
import {
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'

import type { ColumnDef } from '@tanstack/react-table'
import { TsTable } from '../index'

import {
  CollectionView,
  Collection,
  Slot,
  Search,
  Pagination,
  Filter,
  FilterItem,
  Stack,
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
} from '@vtex/shoreline-components'

export default {
  title: 'ts-table/ts-table',
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

export function WithCollection() {
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
              <Menu label="test">
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

  const [status, setStatus] = useState<string>('ready')

  return (
    <Collection>
      <Slot name="header">
        <Slot name="controls">
          <Stack horizontal space="$space-3">
            <Search />
            <Filter label="Status" value={status} setValue={setStatus}>
              <FilterItem value="loading">Loading</FilterItem>
              <FilterItem value="error">Error</FilterItem>
              <FilterItem value="not-found">Not found</FilterItem>
              <FilterItem value="empty">Empty</FilterItem>
              <FilterItem value="unauthorized">Unauthorized</FilterItem>
              <FilterItem value="ready">Ready</FilterItem>
            </Filter>
          </Stack>
          <Pagination page={1} total={74} />
        </Slot>
      </Slot>
      <CollectionView
        status={status as any}
        messages={{ 'empty-action': 'Create product' }}
      >
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
      </CollectionView>
      <Slot name="footer">
        <Pagination page={1} total={74} />
      </Slot>
    </Collection>
  )
}
