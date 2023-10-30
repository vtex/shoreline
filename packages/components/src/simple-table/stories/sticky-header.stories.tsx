import '../../../dist/styles.min.css'
import '../simple-table.css'
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

const data = [...Array(100)].map((_, index) => ({
  imageUrl:
    'https://http2.mlstatic.com/D_NQ_NP_2X_649336-MLA71782871946_092023-F.webp',
  name: 'iPhone 15 pro',
  updatedAt: 'Today',
  status: 'Published',
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

  return <SimpleTable data={data} columns={columns} stickyHeader />
}
