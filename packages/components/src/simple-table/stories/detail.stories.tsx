import '../../../dist/styles.min.css'
import '../simple-table.css'
import React, { useMemo } from 'react'
import {
  IconCaretDown,
  IconCaretRight,
  IconCloudArrowUp,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
} from '@vtex/shoreline-icons'
import type { ColumnDef } from '@tanstack/react-table'

import { Action } from '../../action'
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
import { getExpandedColumn } from '../columns'

export default {
  title: 'shoreline-components/simple-table',
}

type Product = {
  imageUrl: string
  name: string
  updatedAt: string
  status: string
}

export function Detail() {
  const columns = useMemo<Array<ColumnDef<Product>>>(
    () => [
      getExpandedColumn(),
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
      getRowCanExpand={() => true}
      columns={columns}
      renderDetail={(row) => (
        <img
          style={{
            width: '10rem',
          }}
          alt={row.original.name}
          src={row.original.imageUrl}
        />
      )}
    />
  )
}
